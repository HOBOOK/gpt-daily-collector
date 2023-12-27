const schedule = require('node-schedule')
const axios = require('axios');
const OpenAI = require("openai");

const openai = new OpenAI({
    organization: process.env["OPENAI_ORGANIZATION"],
    apiKey: process.env["OPENAI_API_KEY"]
});

const rule = new schedule.RecurrenceRule();
rule.hour = 23; // UTC 기준으로 계산 (현재: 0)
rule.minute = 30; // 매시간 0분에 실행

console.log('JOB을 시작합니다. 현재 시각 기준 :: ', new Date().toLocaleTimeString('ko-KR'))

schedule.scheduleJob(rule, async () => {
    job()
})

const job = async () => {

    const now = new Date();
    now.setHours(now.getHours() + 9)

    console.log('### JOB START :: ' + now + ' ###')


    let issues = []

    let message = ''

    const response = await openai.chat.completions.create({
        messages: buildChatMessages(now, issues),
        model: "gpt-4-vision-preview",
        max_tokens: 1000,
    });
    message += response.choices?.[0]?.message?.content

    console.log(message)
}

const buildChatMessages = (now, issues) => {
    let chatMessages = [
        {
            "role": "system",
            "content": [
                "`You are a helpful assistant named ${name} who provides succinct answers in Markdown format.`"
            ]
        }
    ]

    chatMessages.push({
        role: "user", 
        content: [
            `${now} 시간의 구글 트랜드에 대해 검색해서 보여줘`,
           `${JSON.stringify(issues)}`
        ]
    })

    console.log(chatMessages)

    return chatMessages
}

// const assistant = await openai.beta.assistants.create({
//     name: "Math Tutor",
//     instructions: "You are a personal math tutor. Write and run code to answer math questions.",
//     tools: [{ type: "code_interpreter" }],
//     model: "gpt-4-1106-preview"
// });

// const thread = await openai.beta.threads.create();

// const message = await openai.beta.threads.messages.create(
//     thread.id,
//     {
//       role: "user",
//       content: "I need to solve the equation `3x + 11 = 14`. Can you help me?"
//     }
// );

// const run = await openai.beta.threads.runs.create(
//     thread.id,
//     { 
//       assistant_id: assistant.id,
//       instructions: "Please address the user as Jane Doe. The user has a premium account."
//     }
// );

// // const run = await openai.beta.threads.runs.retrieve(
// //     thread.id,
// //     run.id
// // );

// const messages = await openai.beta.threads.messages.list(
//     thread.id
// );
