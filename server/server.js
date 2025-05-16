const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const connectDB=require('./config/db');
const userRoutes=require('./routes/userRoutes');
const blogRoutes=require('./routes/blogRoutes');

dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());

app.get('/favicon.ico', (req, res) => res.status(204).end());



connectDB();

dotenv.config();
console.log('Environment Variables:');
console.log('PORT:', process.env.PORT);
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

app.use('/api/blogs',blogRoutes);
app.use('/api/users',userRoutes);

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log('Server Running on port '+PORT));