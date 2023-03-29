const aws = require('aws-sdk');
const ddb = new aws.DynamoDB();

exports.handler = async (event, context) => {
  if (!event.request.userAttributes.sub) {
    console.log("Error: No user was written to DynamoDB")
    context.done(null, event);
    return;
  }

  // Save the user to DynamoDB
  const date = new Date();

  const params = {
    Item: {
      'id': { S: event.request.userAttributes.sub },
      '__typename': { S: 'User' },
      'username': { S: event.userName },
      'email': { S: event.request.userAttributes.email },
      'phoneNumber': { S: event.request.userAttributes.phone_number }, // menambahkan atribut nomor_telepon
      'createdAt': { S: date.toISOString() },
      'updatedAt': { S: date.toISOString() },
    },
    TableName: process.env.USERTABLE,
  }

  try {
    await ddb.putItem(params).promise();
    console.log("Success");

    // Update the user's phone number
    const updateParams = {
      TableName: process.env.USERTABLE,
      Key: {
        'id': { S: event.request.userAttributes.sub }
      },
      UpdateExpression: 'SET nomor_telepon = :phoneNumber',
      ExpressionAttributeValues: {
        ':phoneNumber': { S: event.request.userAttributes.phone_number }
      }
    };

    await ddb.updateItem(updateParams).promise();
    console.log("Updated phone number");

  } catch (e) {
    console.log("Error", e);
  }

  context.done(null, event);
}
