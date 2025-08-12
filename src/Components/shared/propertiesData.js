// Shared properties data for the application
export const mockProperties = [
  {
    id: 1,
    name: "St. James Heights",
    address: "199 Oakway Lane, Woodland Hills, CA 91303",
    image: "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/af540e61210cafed0d385974be82aadd5f12648d?placeholderIfAbsent=true",
    trainerStatus: "assigned",
    botStatus: "trained",
    assignedTrainer: {
      id: 1,
      name: "Anthony Bridge",
      avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/f15455d755e0110c54a8cb1e09bd9f3449d967e3?placeholderIfAbsent=true",
      email: "anthony.bridge@housekeepers.com",
      phone: "+1 (555) 234-5678",
      level: "Expert"
    }
  },
  {
    id: 2,
    name: "St. George's Wharf",
    address: "4267 Cherry Tree Drive, Jacksonville, FL 32216",
    image: "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/34ab7288d58c6901d30ca5206b63114908666887?placeholderIfAbsent=true",
    trainerStatus: "unassigned",
    botStatus: "untrained"
  },
  {
    id: 3,
    name: "Greenwich Park Apartments",
    address: "179 Sampson Street, Georgetown, CO 80444",
    image: "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/b7d3e1a3bed60050981448266609ebd7b5f348b2?placeholderIfAbsent=true",
    trainerStatus: "assigned",
    botStatus: "pending",
    assignedTrainer: {
      id: 2,
      name: "Lois Lane",
      avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/e3ad368fd93d0065359bd1d4a2572df1a0952665?placeholderIfAbsent=true",
      email: "lois.lane@housekeepers.com",
      phone: "+1 (555) 345-6789",
      level: "Professional"
    }
  },
  {
    id: 4,
    name: "Greenwich Park Apartments",
    address: "184 Griffin Street, Gilbert, AZ 85233",
    image: "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/a7157538c60aea6c9aedebb40d666f31fc6b4bd6?placeholderIfAbsent=true",
    trainerStatus: "assigned",
    botStatus: "trained",
    assignedTrainer: {
      id: 3,
      name: "Roger Jameson",
      avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/32207b70718921f5952fa161ed847c0bb4f5b6e1?placeholderIfAbsent=true",
      email: "roger.jameson@housekeepers.com",
      phone: "+1 (555) 456-7890",
      level: "Senior"
    }
  },
  {
    id: 5,
    name: "The Oxford Residences",
    address: "1341 Poplar Street, Chicago, IL 60606",
    image: "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/6b3601b1982c33d7a56ff4051131d583ee28708b?placeholderIfAbsent=true",
    trainerStatus: "assigned",
    botStatus: "pending",
    assignedTrainer: {
      id: 4,
      name: "Barbara Gordon",
      avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/e33c0a3b18d462a439c9ff8e8436f61cdb9ae090?placeholderIfAbsent=true",
      email: "barbara.gordon@housekeepers.com",
      phone: "+1 (555) 567-8901",
      level: "Advanced"
    }
  },
  {
    id: 6,
    name: "Thames View Apartments",
    address: "199 Oakway Lane, Woodland Hills, CA 91303",
    image: "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/fdf47f335d2cff058f10899965de1423b67b06e1?placeholderIfAbsent=true",
    trainerStatus: "assigned",
    botStatus: "trained",
    assignedTrainer: {
      id: 5,
      name: "Matt Li",
      avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/566d55e3b2f6957a2c6ce324f19a55c8b0fb2739?placeholderIfAbsent=true",
      email: "matt.li@housekeepers.com",
      phone: "+1 (555) 678-9012",
      level: "Professional"
    }
  },
  {
    id: 7,
    name: "Somerset House Apartments",
    address: "4093 Overlook Drive, Richmond, IN 47374",
    image: "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/ae0fa37a7539c8e2bbe1b0b89e02663b7a14ee47?placeholderIfAbsent=true",
    trainerStatus: "unassigned",
    botStatus: "untrained"
  },
  {
    id: 8,
    name: "Victoria Square Flats",
    address: "2825 Winding Way, Providence, RI 02908",
    image: "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/51d8075f409222d1020b058efce098fe3405826b?placeholderIfAbsent=true",
    trainerStatus: "assigned",
    botStatus: "trained",
    assignedTrainer: {
      id: 6,
      name: "Carol Danvers",
      avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/6455f113dada3beb4b68781ec02e917fbb60a2ee?placeholderIfAbsent=true",
      email: "carol.danvers@housekeepers.com",
      phone: "+1 (555) 789-0123",
      level: "Expert"
    }
  },
  {
    id: 9,
    name: "Mayfair Mansions",
    address: "105 Jerry Dove Drive, Florence, SC 29501",
    image: "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/12666d00ead7527b036d74e7619983d85e503a11?placeholderIfAbsent=true",
    trainerStatus: "assigned",
    botStatus: "pending",
    assignedTrainer: {
      id: 7,
      name: "Devaj Giri",
      avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/25c7574d02d94bfa0f4486b858ae1e9eb65ded49?placeholderIfAbsent=true",
      email: "devaj.giri@housekeepers.com",
      phone: "+1 (555) 890-1234",
      level: "Senior"
    }
  },
  {
    id: 10,
    name: "The Regent Residences",
    address: "3024 Joes Road, Albany, NY 12207",
    image: "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/572c82b962ba5a2215009ca4dfa3c50704042ba9?placeholderIfAbsent=true",
    trainerStatus: "unassigned",
    botStatus: "untrained"
  },
  {
    id: 11,
    name: "Cambridge Gardens",
    address: "3522 West Fork Street, Missoula, MT 59801",
    image: "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/e708b530fb87aab8eda2e756b331ad35d7ff343f?placeholderIfAbsent=true",
    trainerStatus: "unassigned",
    botStatus: "untrained"
  },
  {
    id: 12,
    name: "The Covent Garden Flats",
    address: "417 Bicetown Road, New York, NY 10018",
    image: "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/9f28eef99595a17d5e5db2d57049af71b575723a?placeholderIfAbsent=true",
    trainerStatus: "assigned",
    botStatus: "trained",
    assignedTrainer: {
      id: 8,
      name: "Jeffry Christiansen",
      avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/7423c02310c7a26a0c289ac4afa7967ba4320aa5?placeholderIfAbsent=true",
      email: "jeffry.christiansen@housekeepers.com",
      phone: "+1 (555) 901-2345",
      level: "Professional"
    }
  }
];

export const mockTrainers = [
  {
    id: 1,
    name: "Anthony Bridge",
    image: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/8951d58697e51e2d39a8520fea73941690bbaea3?placeholderIfAbsent=true",
    assignedProperties: 6,
    email: "anthony.bridge@housekeepers.com",
    phone: "+1 (555) 234-5678",
    address: "1234 Professional Ave, New York, NY 10001",
    level: "Expert"
  },
  {
    id: 2,
    name: "Lois Lane",
    image: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/14b8b0f13f4b366cf05a65059b5ce3684c4572c9?placeholderIfAbsent=true",
    assignedProperties: 6,
    email: "lois.lane@housekeepers.com",
    phone: "+1 (555) 345-6789",
    address: "5678 Training Blvd, Los Angeles, CA 90210",
    level: "Professional"
  },
  {
    id: 3,
    name: "Roger Jameson",
    image: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/70d0b8b8a9aa1c1c02e3d953de202009cd40d775?placeholderIfAbsent=true",
    assignedProperties: 6,
    email: "roger.jameson@housekeepers.com",
    phone: "+1 (555) 456-7890",
    address: "9012 Service St, Chicago, IL 60601",
    level: "Senior"
  },
  {
    id: 4,
    name: "Barbara Gordon",
    image: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/b715c19ad748e6cb0c1e9a3a33b7221b4fb3d8b3?placeholderIfAbsent=true",
    assignedProperties: 6,
    email: "barbara.gordon@housekeepers.com",
    phone: "+1 (555) 567-8901",
    address: "3456 Excellence Dr, Houston, TX 77001",
    level: "Advanced"
  },
  {
    id: 5,
    name: "Matt Li",
    image: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/dc93f10e416d5a0bed20db0f1774379265fe9dcb?placeholderIfAbsent=true",
    assignedProperties: 6,
    email: "matt.li@housekeepers.com",
    phone: "+1 (555) 678-9012",
    address: "7890 Quality Rd, Phoenix, AZ 85001",
    level: "Professional"
  }
];
