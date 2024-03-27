import dotenv from 'dotenv';
import {provideIdentity} from "./auth";
import {getDataChunks} from "./api";
import {transformChunks} from "./transform";
import {prepareChartsData} from "./charts";
import {writeOutputToFile} from "./output";
import * as process from "process";

dotenv.config();

const API_KEY = process.env.API_KEY ?? ""
console.log("using API_KEY:", API_KEY);

const LAST_N_DAYS = Number(process.env.LAST_N_DAYS) ?? 30;
console.log("using LAST_N_DAYS:", LAST_N_DAYS);

provideIdentity().then((identity) => {

    console.log("Using principal:", identity?.getPrincipal().toText());

    if (identity == undefined) {
        throw new Error("Identity is undefined");
    }

    getDataChunks(API_KEY, identity, LAST_N_DAYS).then((chunks) => {
        const result = transformChunks(chunks);

        const activeUsersToday = result.dau.data[result.dau.data.length - 1];

        const activeUsersLast7Days = result.wau.data[result.wau.data.length - 1];

        const newUsersToday = result.newUsers.data[result.newUsers.data.length - 1];

        const newUsersLast7Days = Array.from(result.newUsers.data.slice(-7)).reduce((a, b) => a + b, 0);

        const totalUsers = result.projectUsers;

        const dau = prepareChartsData(result.dau);

        const wau = prepareChartsData(result.wau);

        const mau = prepareChartsData(result.mau);

        const newUsers = prepareChartsData(result.newUsers);

        writeOutputToFile({
            activeUsersToday,
            activeUsersLast7Days,
            newUsersToday,
            newUsersLast7Days,
            totalUsers,
            dau,
            wau,
            mau,
            newUsers
        })
    })
})
