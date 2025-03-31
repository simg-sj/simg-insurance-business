module.exports = {
    apps: [
        {
            name: "portal_cms",
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "production",
                NEXTAUTH_URL: "https://portal.simg.kr",
            },
        },
    ],
};
