import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { Department, "First Places": firstPlaces, "Second Places": secondPlaces, "Total Wins": totalWins, Points } = body;

    if (!Department || firstPlaces === undefined || secondPlaces === undefined || totalWins === undefined || Points === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    
    await client.connect();
    const database = client.db('cultural-championship');
    const pointsCollection = database.collection('points');

    // Update or insert the document
    const result = await pointsCollection.updateOne(
      { Department },
      {
        $set: {
          "First Places": firstPlaces,
          "Second Places": secondPlaces,
          "Total Wins": totalWins,
          Points,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    await client.close();

    return NextResponse.json({
      success: true,
      message: 'Points updated successfully',
      result
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 