const apiLib = require('../server/lib/_api_lib');

async function slackTest(){
    let messageSlack = `<!subteam^S04JGMUTQ05>`;
    let slackData = {
        "channel": "#slackbottest",
        "username": `쏘카 단체상해 보험 접수 알림`,
        "text": messageSlack,
        //"icon_emoji": ":ghost:"
    };
    let result2 = await apiLib.slackWebHook(slackData);
    console.log(result2)
}

slackTest()