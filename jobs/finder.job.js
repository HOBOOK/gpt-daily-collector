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
        },
    ]

    chatMessages.push({
        role: "user", 
        content: [
           `${JSON.stringify(issues)}`
        ]
    })

    return chatMessages
}

job()


