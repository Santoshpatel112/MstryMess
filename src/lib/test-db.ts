import dbconnect from './dbConnect';

async function testConnection() {
    try {
        await dbconnect();
        console.log('Database connection test successful');
    } catch (error) {
        console.error('Database connection test failed:', error);
    }
}

testConnection();