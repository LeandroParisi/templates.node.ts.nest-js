import { format, transports } from "winston";

export const configuration = {
    format: format.combine(format.timestamp(), format.json()),
    defaultMeta: { service: "user-service" },
    transports: [
        new transports.File({
            maxsize: 20000000,
            filename: "logs/app.log",
        }),
        new transports.Console({
            format: format.simple(),
        }),
    ],
};
