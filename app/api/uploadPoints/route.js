import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { data } = await request.json();

    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: 'Invalid data format. Expected non-empty array.' },
        { status: 400 }
      );
    }

    // Validate data structure
    const isValidData = data.every(item => 
      item.Department &&
      typeof item["First Places"] === 'number' &&
      typeof item["Second Places"] === 'number' &&
      typeof item["Total Wins"] === 'number' &&
      typeof item.Points === 'number'
    );

    if (!isValidData) {
      return NextResponse.json(
        { error: 'Invalid data structure in array' },
        { status: 400 }
      );
    }

    // Sort data by Points in descending order and update rankings
    const sortedData = data
      .sort((a, b) => b.Points - a.Points)
      .map((item, index) => ({
        ...item,
        Ranking: index + 1
      }));

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MongoDB URI is not configured');
    }

    const client = new MongoClient(uri);
    await client.connect();

    const database = client.db('cultural-championship');
    const pointsCollection = database.collection('points');

    // Clear existing data
    await pointsCollection.deleteMany({});

    // Insert sorted data
    const result = await pointsCollection.insertMany(
      sortedData.map(item => ({
        ...item,
        updatedAt: new Date()
      }))
    );

    await client.close();

    return NextResponse.json({
      success: true,
      message: 'Points data updated successfully',
      insertedCount: result.insertedCount
    });

  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 