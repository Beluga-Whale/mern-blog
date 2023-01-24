import mongoose from 'mongoose'
import chalk from 'chalk'

const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(chalk.magenta(`${conn.connection.host}`));

    } catch (err) {
        console.log(chalk.red(err));
        process.exit(1)
    }
}

export default ConnectDB