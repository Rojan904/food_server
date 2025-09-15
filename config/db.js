import colors from 'colors';
import mongoose from 'mongoose';
//mongodb connection database
export const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(colors.bgCyan(`Connected to database ${mongoose.connection.host}`));
    } catch (error) {
        console.log(colors.bgRed('errordb ', error));
    }
}