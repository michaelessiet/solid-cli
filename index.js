import inquirer from "inquirer";
import { execa, $ } from "execa";

const solidstart = "SolidStart";
const solidjs = "Solidjs";
const pleaseSelectTemplateMessage =
  "Please select the template you would like to use";
const creatingProjectMessage = "Creating project...";

async function main() {
  const { projectname } = await inquirer.prompt({
    name: "projectname",
    type: "input",
    message: "What should your project be called?",
    default: "my-app",
  });
  const { projecttype } = await inquirer.prompt({
    name: "projecttype",
    type: "list",
    message: "What kind of project would you like to create?",
    choices: [solidjs, solidstart],
  });

  switch (projecttype) {
    case solidjs:
      // solidjs function
      try {
        solidjsPrompter(projectname);
      } catch (error) {
        console.error(
          `Sorry something went wrong while creating your project: ${error}`,
        );
      }
      break;

    case solidstart:
      // solidstart function
      try {
        solidstartPrompter(projectname);
      } catch (error) {
        console.error(
          `Sorry something went wrong while creating your project: ${error}`,
        );
      }
      break;

    default:
      console.error("Invalid selection. Please select a valid project type");
      break;
  }
}

main();

async function solidjsPrompter(projectname) {
  const { isTS } = await inquirer.prompt({
    name: "isTS",
    type: "confirm",
    message: "Would you like to use Typescript?",
    default: true,
  });

  if (isTS) {
    const { template } = await inquirer.prompt({
      name: "template",
      type: "list",
      message: pleaseSelectTemplateMessage,
      choices: [
        "basic",
        "vitest",
        "uvu",
        "unocss",
        "tailwindcss",
        "sass",
        "router",
        "jest",
        "bootstrap",
      ],
    });
    const templatename = template === "basic" ? "ts" : `ts-${template}`;

    await solidjsScriptRunner(templatename, projectname);
  } else {
    const { template } = await inquirer.prompt({
      name: "template",
      type: "list",
      message: pleaseSelectTemplateMessage,
      choices: ["basic", "tailwindcss", "vitest"],
    });
    const templatename = template === "basic" ? "js" : `js-${template}`;

    await solidjsScriptRunner(templatename, projectname);
  }
}

async function solidjsScriptRunner(templatename, projectname) {
  console.log(creatingProjectMessage);
  try {
    await $({
      stdio: "inherit",
    })`npx degit solidjs/templates/${templatename} ${projectname}`;

    console.log("Project successfully created! 🎉");

    console.info(`
Run the following commands to get started
> cd ${projectname}
> npm install
> npm run dev -- --open
`);
  } catch (error) {
    console.error(`Something went wrong while creating your project: ${error}`);
  }
}

async function solidstartPrompter(projectname) {
  console.log("This hasn't been implemented yet");
}

async function solidStartScriptRunner(templatename, projectname) {}
