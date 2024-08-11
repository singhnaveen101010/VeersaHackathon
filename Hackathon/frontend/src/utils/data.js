const pastMatches = [
    {
      name: "Match 1",
      startDate: "2024-06-01T10:00:00Z",
      endDate: "2024-06-01T14:00:00Z",
      players: [
        {
          name: "Player 1",
          runs: 50,
          bets: [
            {
              user: "64c5aefef21b4b1a3c5e8c12", // example ObjectId
              betOn: "higher"
            },
            {
              user: "64c5af1ef21b4b1a3c5e8c13", // example ObjectId
              betOn: "equal"
            }
          ],
          result: "higher"
        },
        {
          name: "Player 2",
          runs: 30,
          bets: [
            {
              user: "64c5af3ef21b4b1a3c5e8c14", // example ObjectId
              betOn: "lower"
            }
          ],
          result: "lower"
        }
      ],
      matchEnded: true
    }
  ];
  
  const ongoingMatches = [
    {
      name: "Match 2",
      startDate: "2024-07-30T10:00:00Z",
      endDate: "2024-07-30T14:00:00Z",
      players: [
        {
          name: "Player 3",
          runs: 20,
          bets: [
            {
              user: "64c5af5ef21b4b1a3c5e8c15", // example ObjectId
              betOn: "equal"
            }
          ],
          result: "pending"
        },
        {
          name: "Player 4",
          runs: 40,
          bets: [
            {
              user: "64c5af7ef21b4b1a3c5e8c16", // example ObjectId
              betOn: "higher"
            }
          ],
          result: "pending"
        }
      ],
      matchEnded: false
    }
  ];
  
  const upcomingMatches = [
    {
      name: "Match 3",
      startDate: "2024-08-15T10:00:00Z",
      endDate: "2024-08-15T14:00:00Z",
      players: [
        {
          name: "Player 5",
          runs: 0,
          bets: [],
          result: "pending"
        },
        {
          name: "Player 6",
          runs: 0,
          bets: [],
          result: "pending"
        }
      ],
      matchEnded: false
    }
  ];
  
  const allMatches = [...pastMatches, ...ongoingMatches, ...upcomingMatches];
  const transactions = [
    {
      _id: '1',
      user: '60d0fe4f5311236168a109ca',
      amount: 100,
      type: 'credit',
      status: 'approved',
      qr: 'qrCodeImage1.png',
      createdAt: '2024-07-20T12:34:56Z',
      updatedAt: '2024-07-20T12:34:56Z',
    },
    {
      _id: '2',
      user: '60d0fe4f5311236168a109cb',
      amount: 50,
      type: 'debit',
      status: 'pending',
      qr: 'qrCodeImage2.png',
      createdAt: '2024-07-21T14:20:00Z',
      updatedAt: '2024-07-21T14:20:00Z',
    },
    {
      _id: '3',
      user: '60d0fe4f5311236168a109cc',
      amount: 200,
      type: 'credit',
      status: 'rejected',
      qr: 'qrCodeImage3.png',
      createdAt: '2024-07-22T09:15:30Z',
      updatedAt: '2024-07-22T09:15:30Z',
    },
  ];
  
export  {pastMatches, ongoingMatches, upcomingMatches, allMatches, transactions};
  