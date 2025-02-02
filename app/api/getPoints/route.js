import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MongoDB URI is not defined');
    }

    const client = new MongoClient(uri);
    
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('cultural-championship');
    const points = database.collection('points');
    
    // Get all points data
    const data = await points.find({}).toArray();
    console.log('Raw data from MongoDB:', data);

    // Sort data by points and add ranking
    const sortedData = data
      .sort((a, b) => b.points - a.points)
      .map((item, index) => ({
        ...item,
        _id: item._id.toString(), // Convert ObjectId to string
        ranking: index + 1
      }));

    console.log('Processed data:', sortedData);

    await client.close();
    
    return NextResponse.json({ data: sortedData });
  } catch (error) {
    console.error('Error in getPoints:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 