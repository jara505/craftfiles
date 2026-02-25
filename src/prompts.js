import inquirer from 'inquirer';
import { detectProjectType, detectExistingQualityTool, isTypeScriptProject } from './detectors.js';

async function collectAnswers(profile) {
  const projectType = detectProjectType();
  const isTs = isTypeScriptProject();

  let answers = { linter: 'Biome', env: true, agents: true, tsconfig: false, enableAlias: false };

  if (process.stdout.isTTY) {
    answers = await collectInteractiveAnswers(projectType, isTs, profile);
  } else {
    console.log('Non-interactive mode: Using defaults.');
    if (isTs) {
      answers.tsconfig = true;
      answers.enableAlias = true;
    }

    // Detect conflict in non-interactive mode
    if (answers.linter !== 'None') {
      const existingTool = detectExistingQualityTool();

      if (existingTool && existingTool !== answers.linter) {
        console.log(`⚠️  Detected existing quality tool: ${existingTool}`);
        console.log(`Skipping ${answers.linter} generation to avoid conflict.`);
        answers.linter = 'None';
      }
    }
  }

  return answers;
}

async function collectInteractiveAnswers(projectType, isTs, profile) {
  let answers = { linter: 'Biome', env: true, agents: true, tsconfig: false, enableAlias: false };

  // Ask linter question first to detect conflicts immediately
  if (projectType === 'js/ts') {
    const linterAnswer = await inquirer.prompt({
      type: 'list',
      name: 'linter',
      message: 'Choose your code quality tool (Biome: linter + formatter, Prettier: formatter only):',
      choices: ['Biome', 'Prettier', 'None'],
      default: 'Biome'
    });

    answers.linter = linterAnswer.linter;

    // Detect conflict between quality tools right after selection
    if (answers.linter !== 'None') {
      const existingTool = detectExistingQualityTool();

      if (existingTool && existingTool !== answers.linter) {
        console.log(`\n⚠️  Detected existing quality tool: ${existingTool}`);

        const { replace } = await inquirer.prompt({
          type: 'confirm',
          name: 'replace',
          message: `Do you want to replace it with ${answers.linter}?`,
          default: false
        });

        if (!replace) {
          answers.linter = 'None';
        }
      }
    }
  }

  // Continue with remaining questions
  const remainingQuestions = [];

  if (isTs) {
    remainingQuestions.push({
      type: 'confirm',
      name: 'tsconfig',
      message: 'Generate a tsconfig.json file with best practices?',
      default: true
    });
    remainingQuestions.push({
      type: 'confirm',
      name: 'enableAlias',
      message: 'Enable path aliases (e.g., @/* for src/*)?',
      default: true,
      when: (a) => a.tsconfig
    });
  }

  remainingQuestions.push({
    type: 'confirm',
    name: 'env',
    message: 'Create .env file with basic environment variables?',
    default: true
  });

  if (!profile) {
    remainingQuestions.push({
      type: 'list',
      name: 'profile',
      message: 'What type of project is this?',
      choices: ['backend', 'frontend'],
      default: 'backend',
      when: (a) => a.env
    });
  }

  remainingQuestions.push({
    type: 'confirm',
    name: 'agents',
    message: 'Create AGENTS.md with instructions for AI tools?',
    default: true
  });

  const remainingAnswers = await inquirer.prompt(remainingQuestions);
  return { ...answers, ...remainingAnswers };
}

async function confirmOverwrite(differing) {
  console.log('\n⚠️  The following files already exist and differ:');
  for (const f of differing) {
    console.log(`  - ${f.filename}`);
  }

  if (process.stdout.isTTY) {
    const answer = await inquirer.prompt({
      type: 'confirm',
      name: 'overwrite',
      message: 'Do you want to overwrite them?',
      default: false
    });
    return answer.overwrite;
  }

  console.log('Skipping overwrite in non-interactive mode.');
  return false;
}

export { collectAnswers, confirmOverwrite };
