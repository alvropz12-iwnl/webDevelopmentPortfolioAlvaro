// index.js - Node.js Telemetry Engine
import os from 'node:os';
import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import axios from 'axios';

async function generateTelemetryReport() {
    console.log(chalk.cyan("Initializing Node.js Telemetry Engine...\n"));

    try {
        // ==========================================
        // 1. HARVEST SYSTEM TELEMETRY (Built-in 'os' module)
        // ==========================================
        const platform = os.platform();
        const arch = os.arch();
        const cpuModel = os.cpus()[0]?.model || "N/A";

        const totalMemMB = os.totalmem() / (1024 * 1024);
        const freeMemMB = os.freemem() / (1024 * 1024);
        const usedMemMB = totalMemMB - freeMemMB;

        const uptimeHours = os.uptime() / 3600;
    
        // ==========================================
        // 2. RENDER FORMATTED TERMINAL LOGS (Third-Party 'chalk')
        // ==========================================
        console.log(chalk.blue.bold("=========================================="));
        console.log(chalk.blue.bold("         SYSTEM & ENV TELEMETRY           "));
        console.log(chalk.blue.bold("=========================================="));
        console.log(`${chalk.bold("OS Platform:")}      ${chalk.yellow(platform)} (${chalk.gray(arch)})`);
        console.log(`${chalk.bold("CPU Model:")}        ${chalk.magenta(cpuModel)}`);

        console.log(
            `${chalk.bold("Memory:")}           ` +
            `${chalk.green(freeMemMB.toFixed(2) + " MB free")} / ` +
            `${chalk.red(usedMemMB.toFixed(2) + " MB used")} / ` +
            `${chalk.white(totalMemMB.toFixed(2) + " MB total")}`
        );

        console.log(`${chalk.bold("Uptime:")}           ${chalk.cyan(uptimeHours.toFixed(2) + " hours")}`);

        console.log(chalk.blue.bold("==========================================\n"));

        // ==========================================
        // 3. WRITE PERMANENT LOG FILE (Built-in 'fs/promises')
        // ==========================================
        const logFilePath = path.join(process.cwd(), 'telemetry.txt');

        const logEntry =
            `[${new Date().toISOString()}] ` +
            `PLATFORM: ${platform} (${arch}) \n ` +
            `CPU: ${cpuModel} \n ` +
            `FREEMEM: ${freeMemMB.toFixed(2)}MB \n ` +
            `USEDMEM: ${usedMemMB.toFixed(2)}MB \n ` +
            `TOTALMEM: ${totalMemMB.toFixed(2)}MB \n ` +
            `UPTIME: ${uptimeHours.toFixed(2)}h \n `;

        console.log(chalk.gray("Writing log entry to disk..."));

        await fs.appendFile(logFilePath, logEntry, "utf-8");

        console.log(
            chalk.green.bold("✔ Telemetry audit completed and logged successfully!\n")
        );
    } catch (error) {
        console.error(
            chalk.red.bold("Telemetry report generation failed:"),
            error.message
        );
    }
}

// Execute engine
generateTelemetryReport();
