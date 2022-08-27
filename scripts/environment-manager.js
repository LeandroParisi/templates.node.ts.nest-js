const download = require("download");
const fs = require("fs");

const ENV_MAPPER = {
    test: {
        fileName: ".env.test",
        id: process.env.SNIPPET_TEST_FILE_ID,
    },
    dev: {
        fileName: ".env.development",
        id: process.env.SNIPPET_DEV_FILE_ID,
    },
};

const PATH_TO_SAVE_ENV_FILE = "./env";
const AUTH_HEADER = { "PRIVATE-TOKEN": process.env.GITLAB_AUTH_TOKEN };

function validateAuthToken() {
    if(!process.env.GITLAB_AUTH_TOKEN){
        throw new Error("You need configured GITLAB_AUTH_TOKEN in your environment.")
    }
}

async function createPath() {
    await fs.promises.mkdir(PATH_TO_SAVE_ENV_FILE, { recursive: true }, (error) => {
        if (!error) {
            console.log("New directory successfully created.");
        } else{
            throw new Error("It wasn't possible create env folder.")
        }
    });
}

async function getDevelopmentEnv(environment) {
    try {
        validateAuthToken();
        await createPath();

        const envMapper = ENV_MAPPER[environment];

        const pathToSaveFile = `${PATH_TO_SAVE_ENV_FILE}/${envMapper.fileName}`;       

        const envAlreadyExists = fs.existsSync(pathToSaveFile);

        if (!envAlreadyExists) {
            const snippetUrl = `https://gitlab.com/api/v4/snippets/${envMapper.id}/files/main/${envMapper.fileName}/raw`;

            download(snippetUrl, undefined, { headers: AUTH_HEADER }).pipe(
                fs.createWriteStream(pathToSaveFile)
            );
        }

        console.log(`The env file ${envMapper.fileName} was generated with success on ./env folder`);

    } catch (error) {
        console.log(`It wasn't possible generate env file. ${error}`);
        process.exit(1);
    }
}

getDevelopmentEnv(process.argv[2]);
