const db = require("./db");
const {Comment, Conversation, Follow, Like, Message, Post, Track, User} = require("./db/models");

const TrackSeed = [{

    "spotifyId": "sw9PtlxCNKOZXH9c",
    "name": "Oil - Margarine",
    "artist": "Dolley",
    "url": "https://blinklist.com/dis/parturient/montes.html?nulla=arcu&nisl=sed&nunc=augue&nisl=aliquam&duis=erat&bibendum=volutpat&felis=in&sed=congue&interdum=etiam&venenatis=justo&turpis=etiam&enim=pretium&blandit=iaculis&mi=justo&in=in&porttitor=hac&pede=habitasse&justo=platea&eu=dictumst&massa=etiam&donec=faucibus&dapibus=cursus&duis=urna&at=ut&velit=tellus&eu=nulla&est=ut&congue=erat&elementum=id&in=mauris&hac=vulputate&habitasse=elementum&platea=nullam&dictumst=varius&morbi=nulla&vestibulum=facilisi&velit=cras&id=non&pretium=velit&iaculis=nec&diam=nisi&erat=vulputate&fermentum=nonummy&justo=maecenas&nec=tincidunt&condimentum=lacus&neque=at&sapien=velit&placerat=vivamus&ante=vel&nulla=nulla&justo=eget&aliquam=eros&quis=elementum&turpis=pellentesque&eget=quisque&elit=porta&sodales=volutpat&scelerisque=erat&mauris=quisque&sit=erat&amet=eros&eros=viverra&suspendisse=eget&accumsan=congue&tortor=eget&quis=semper&turpis=rutrum&sed=nulla&ante=nunc&vivamus=purus&tortor=phasellus&duis=in",
    "coverPicUrl": "http://dummyimage.com/135x100.png/ff4444/ffffff"
  }, {

    "spotifyId": "xwQOMSPbqeI4wM2T",
    "name": "Cup - 8oz Coffee Perforated",
    "artist": "Bella",
    "url": "http://gravatar.com/ipsum/aliquam/non/mauris/morbi.json?sit=odio&amet=elementum&erat=eu&nulla=interdum&tempus=eu&vivamus=tincidunt&in=in&felis=leo&eu=maecenas&sapien=pulvinar&cursus=lobortis&vestibulum=est&proin=phasellus&eu=sit&mi=amet&nulla=erat&ac=nulla&enim=tempus&in=vivamus&tempor=in&turpis=felis&nec=eu&euismod=sapien&scelerisque=cursus&quam=vestibulum&turpis=proin&adipiscing=eu&lorem=mi&vitae=nulla&mattis=ac&nibh=enim",
    "coverPicUrl": "http://dummyimage.com/177x100.png/cc0000/ffffff"
  }, {

    "spotifyId": "mFnTpawFBtzhyQ6Q",
    "name": "Cheese - Cottage Cheese",
    "artist": "Rosalinda",
    "url": "https://eventbrite.com/in/purus.js?justo=nulla&lacinia=ultrices&eget=aliquet&tincidunt=maecenas&eget=leo&tempus=odio&vel=condimentum&pede=id&morbi=luctus&porttitor=nec&lorem=molestie&id=sed&ligula=justo&suspendisse=pellentesque&ornare=viverra&consequat=pede&lectus=ac&in=diam&est=cras",
    "coverPicUrl": "http://dummyimage.com/203x100.png/cc0000/ffffff"
  }, {

    "spotifyId": "rd6YJtxu5ABRPbnv",
    "name": "Kiwano",
    "artist": "Alvis",
    "url": "https://theguardian.com/non/pretium/quis/lectus.aspx?habitasse=sit&platea=amet&dictumst=consectetuer&aliquam=adipiscing&augue=elit&quam=proin&sollicitudin=interdum&vitae=mauris&consectetuer=non&eget=ligula&rutrum=pellentesque&at=ultrices&lorem=phasellus&integer=id&tincidunt=sapien&ante=in&vel=sapien&ipsum=iaculis&praesent=congue&blandit=vivamus&lacinia=metus&erat=arcu&vestibulum=adipiscing&sed=molestie&magna=hendrerit&at=at&nunc=vulputate&commodo=vitae&placerat=nisl&praesent=aenean&blandit=lectus&nam=pellentesque&nulla=eget&integer=nunc&pede=donec&justo=quis&lacinia=orci&eget=eget&tincidunt=orci&eget=vehicula&tempus=condimentum&vel=curabitur&pede=in&morbi=libero&porttitor=ut&lorem=massa&id=volutpat&ligula=convallis&suspendisse=morbi&ornare=odio&consequat=odio&lectus=elementum&in=eu&est=interdum&risus=eu&auctor=tincidunt&sed=in&tristique=leo&in=maecenas&tempus=pulvinar&sit=lobortis&amet=est&sem=phasellus&fusce=sit&consequat=amet&nulla=erat&nisl=nulla&nunc=tempus&nisl=vivamus&duis=in&bibendum=felis&felis=eu&sed=sapien&interdum=cursus&venenatis=vestibulum&turpis=proin&enim=eu&blandit=mi&mi=nulla&in=ac&porttitor=enim&pede=in&justo=tempor&eu=turpis&massa=nec&donec=euismod&dapibus=scelerisque&duis=quam&at=turpis&velit=adipiscing&eu=lorem&est=vitae&congue=mattis",
    "coverPicUrl": "http://dummyimage.com/205x100.png/ff4444/ffffff"
  }, {

    "spotifyId": "jpXEw4zDuVek6phm",
    "name": "Clams - Canned",
    "artist": "Lewes",
    "url": "https://sciencedaily.com/luctus/tincidunt.jpg?in=purus&imperdiet=eu&et=magna&commodo=vulputate&vulputate=luctus&justo=cum&in=sociis&blandit=natoque&ultrices=penatibus&enim=et&lorem=magnis&ipsum=dis&dolor=parturient&sit=montes&amet=nascetur&consectetuer=ridiculus&adipiscing=mus&elit=vivamus&proin=vestibulum&interdum=sagittis&mauris=sapien&non=cum&ligula=sociis&pellentesque=natoque&ultrices=penatibus&phasellus=et&id=magnis&sapien=dis&in=parturient&sapien=montes&iaculis=nascetur&congue=ridiculus&vivamus=mus&metus=etiam&arcu=vel&adipiscing=augue&molestie=vestibulum&hendrerit=rutrum&at=rutrum&vulputate=neque&vitae=aenean&nisl=auctor&aenean=gravida&lectus=sem&pellentesque=praesent&eget=id&nunc=massa&donec=id&quis=nisl&orci=venenatis&eget=lacinia&orci=aenean&vehicula=sit&condimentum=amet&curabitur=justo&in=morbi&libero=ut&ut=odio&massa=cras&volutpat=mi&convallis=pede&morbi=malesuada&odio=in&odio=imperdiet&elementum=et",
    "coverPicUrl": "http://dummyimage.com/232x100.png/5fa2dd/ffffff"
  }, {

    "spotifyId": "5fMyLA1nZJeIENdG",
    "name": "Glove - Cutting",
    "artist": "Dodi",
    "url": "http://amazon.co.jp/in/lacus/curabitur/at.js?pellentesque=porta&viverra=volutpat&pede=erat&ac=quisque&diam=erat&cras=eros&pellentesque=viverra&volutpat=eget&dui=congue&maecenas=eget&tristique=semper&est=rutrum&et=nulla&tempus=nunc&semper=purus&est=phasellus&quam=in&pharetra=felis&magna=donec&ac=semper&consequat=sapien&metus=a&sapien=libero&ut=nam&nunc=dui&vestibulum=proin&ante=leo&ipsum=odio&primis=porttitor&in=id&faucibus=consequat&orci=in&luctus=consequat&et=ut&ultrices=nulla&posuere=sed",
    "coverPicUrl": "http://dummyimage.com/214x100.png/ff4444/ffffff"
  }, {

    "spotifyId": "dF2Xc84cYiO90Xbo",
    "name": "Glycerine",
    "artist": "Marrissa",
    "url": "http://dropbox.com/ligula/pellentesque/ultrices.js?habitasse=eget&platea=vulputate&dictumst=ut&maecenas=ultrices&ut=vel&massa=augue&quis=vestibulum&augue=ante&luctus=ipsum&tincidunt=primis&nulla=in&mollis=faucibus&molestie=orci&lorem=luctus&quisque=et&ut=ultrices&erat=posuere&curabitur=cubilia&gravida=curae&nisi=donec",
    "coverPicUrl": "http://dummyimage.com/134x100.png/dddddd/000000"
  }, {

    "spotifyId": "85xa8O0E9aTSZkNe",
    "name": "Scallops - 20/30",
    "artist": "Carolyne",
    "url": "http://icq.com/praesent.html?cum=pede&sociis=malesuada&natoque=in&penatibus=imperdiet&et=et&magnis=commodo&dis=vulputate&parturient=justo&montes=in&nascetur=blandit&ridiculus=ultrices&mus=enim&etiam=lorem&vel=ipsum&augue=dolor&vestibulum=sit&rutrum=amet&rutrum=consectetuer&neque=adipiscing&aenean=elit&auctor=proin&gravida=interdum&sem=mauris&praesent=non&id=ligula&massa=pellentesque&id=ultrices&nisl=phasellus&venenatis=id&lacinia=sapien&aenean=in&sit=sapien&amet=iaculis&justo=congue&morbi=vivamus&ut=metus",
    "coverPicUrl": "http://dummyimage.com/247x100.png/dddddd/000000"
  }, {

    "spotifyId": "I7Hva7kIPdzE9W7R",
    "name": "Potatoes - Mini White 3 Oz",
    "artist": "Loreen",
    "url": "http://a8.net/mauris/viverra/diam.js?erat=ut&tortor=dolor&sollicitudin=morbi&mi=vel&sit=lectus&amet=in&lobortis=quam&sapien=fringilla&sapien=rhoncus&non=mauris&mi=enim&integer=leo&ac=rhoncus&neque=sed&duis=vestibulum&bibendum=sit&morbi=amet&non=cursus&quam=id&nec=turpis&dui=integer&luctus=aliquet&rutrum=massa&nulla=id&tellus=lobortis&in=convallis&sagittis=tortor&dui=risus&vel=dapibus",
    "coverPicUrl": "http://dummyimage.com/100x100.png/ff4444/ffffff"
  }, {
  
    "spotifyId": "pBKarkjIcPJu7GO3",
    "name": "Beef - Rib Roast, Capless",
    "artist": "Shirleen",
    "url": "http://smh.com.au/eleifend/donec/ut/dolor/morbi/vel/lectus.json?rhoncus=sapien&aliquet=cursus&pulvinar=vestibulum&sed=proin&nisl=eu&nunc=mi&rhoncus=nulla&dui=ac&vel=enim&sem=in&sed=tempor&sagittis=turpis&nam=nec&congue=euismod&risus=scelerisque&semper=quam&porta=turpis&volutpat=adipiscing",
    "coverPicUrl": "http://dummyimage.com/189x100.png/5fa2dd/ffffff"
}];

const UserSeed = [{

    "userName": "ahinz0",
    "firstName": "Alana",
    "lastName": "Hinz",
    "email": "ahinz0@nps.gov",
    "password": "mV7'PIvU1~D|",
    "profilePicUrl": "http://dummyimage.com/209x100.png/ff4444/ffffff",
    "spotifyLogin": true,
    "spotifyProfileId": "IfVrfIkgQ0HJPPIZ",
    "currentlyListeningId": 8,
    "spotifyPlaylistId": "vsINVZHlKKoUuq5F"
  }, {

    "userName": "kgoulston1",
    "firstName": "Kelsey",
    "lastName": "Goulston",
    "email": "kgoulston1@cbc.ca",
    "password": "pR1&d)sAEVT@zL%",
    "profilePicUrl": "http://dummyimage.com/217x100.png/dddddd/000000",
    "spotifyLogin": false,
    "spotifyProfileId": null,
    "currentlyListeningId": 3,
    "spotifyPlaylistId": null
  }, {

    "userName": "cveneur2",
    "firstName": "Conrad",
    "lastName": "Veneur",
    "email": "cveneur2@dot.gov",
    "password": "hE3\\ZQAL",
    "profilePicUrl": "http://dummyimage.com/204x100.png/ff4444/ffffff",
    "spotifyLogin": true,
    "spotifyProfileId": "rmbwm8mJBPda6jpN",
    "currentlyListeningId": 5,
    "spotifyPlaylistId": "NStmDNKKt43iUzIN"
  }, {

    "userName": "kjoder3",
    "firstName": "Kirbie",
    "lastName": "Joder",
    "email": "kjoder3@cnbc.com",
    "password": "dB2|pzJLna1",
    "profilePicUrl": null,
    "spotifyLogin": false,
    "spotifyProfileId": null,
    "currentlyListeningId": 8,
    "spotifyPlaylistId": null
  }, {

    "userName": "mmorais4",
    "firstName": "Martyn",
    "lastName": "Morais",
    "email": "mmorais4@hexun.com",
    "password": "sQ7>%ns,>",
    "profilePicUrl": null,
    "spotifyLogin": true,
    "spotifyProfileId": "oRSPSSCYg8yCijIn",
    "currentlyListeningId": 8,
    "spotifyPlaylistId": "BJqn4p37qrwC6n9r"
  }, {

    "userName": "rsaggers5",
    "firstName": "Ryann",
    "lastName": "Saggers",
    "email": "rsaggers5@loc.gov",
    "password": "eU3.&Z,IqN8(iUY",
    "profilePicUrl": null,
    "spotifyLogin": true,
    "spotifyProfileId": "wiSNjGWIUbPkcGVR",
    "currentlyListeningId": 4,
    "spotifyPlaylistId": "Iapu5q2671LWqmCA"
  }, {

    "userName": "mfife6",
    "firstName": "Mariana",
    "lastName": "Fife",
    "email": "mfife6@google.ca",
    "password": "mB9\"Z'2vi",
    "profilePicUrl": "http://dummyimage.com/243x100.png/ff4444/ffffff",
    "spotifyLogin": true,
    "spotifyProfileId": "fU9ta7Xj7OtvtaAh",
    "currentlyListeningId": 4,
    "spotifyPlaylistId": "B9bywFO3dJrzsGne"
  }, {

    "userName": "alinfield7",
    "firstName": "Ardelle",
    "lastName": "Linfield",
    "email": "alinfield7@lycos.com",
    "password": "iR0)p=3Wa",
    "profilePicUrl": null,
    "spotifyLogin": true,
    "spotifyProfileId": "fgwLCUVoZt1r1fSo",
    "currentlyListeningId": 5,
    "spotifyPlaylistId": "Ra75dR0BBNkFSYo6"
  }, {

    "userName": "mgallahue8",
    "firstName": "Marlin",
    "lastName": "Gallahue",
    "email": "mgallahue8@marriott.com",
    "password": "fA4/4}iX(Su#'(n",
    "profilePicUrl": null,
    "spotifyLogin": false,
    "spotifyProfileId": null,
    "currentlyListeningId": 9,
    "spotifyPlaylistId": null
  }, {
  
    "userName": "lleamy9",
    "firstName": "Lora",
    "lastName": "Leamy",
    "email": "lleamy9@jimdo.com",
    "password": "eF2|n)%MYB&>}",
    "profilePicUrl": "http://dummyimage.com/135x100.png/cc0000/ffffff",
    "spotifyLogin": false,
    "spotifyProfileId": null,
    "currentlyListeningId": 9,
    "spotifyPlaylistId": null
  }, {
  
    "userName": "dvatchera",
    "firstName": "Dena",
    "lastName": "Vatcher",
    "email": "dvatchera@mlb.com",
    "password": "yS8.dPGtf'#.=wz",
    "profilePicUrl": "http://dummyimage.com/240x100.png/dddddd/000000",
    "spotifyLogin": false,
    "spotifyProfileId": null,
    "currentlyListeningId": 8,
    "spotifyPlaylistId": null
  }, {
  
    "userName": "twaseb",
    "firstName": "Trix",
    "lastName": "Wase",
    "email": "twaseb@imageshack.us",
    "password": "iF9.kVFLJ/L>",
    "profilePicUrl": null,
    "spotifyLogin": true,
    "spotifyProfileId": "mTbMRzE28ud722Oj",
    "currentlyListeningId": 3,
    "spotifyPlaylistId": "MbzWSgS2tLzwB81V"
  }, {
  
    "userName": "mfrantsevc",
    "firstName": "Melissa",
    "lastName": "Frantsev",
    "email": "mfrantsevc@sphinn.com",
    "password": "cN3_x8|KaM2A9",
    "profilePicUrl": null,
    "spotifyLogin": true,
    "spotifyProfileId": "SRybMvRT80IcJzxI",
    "currentlyListeningId": 9,
    "spotifyPlaylistId": "qZFz7AnkAGMo2lh2"
  }, {
  
    "userName": "jdessentd",
    "firstName": "Jeanne",
    "lastName": "Dessent",
    "email": "jdessentd@sina.com.cn",
    "password": "uG0@&cT79%Xt6>Q",
    "profilePicUrl": null,
    "spotifyLogin": false,
    "spotifyProfileId": null,
    "currentlyListeningId": 5,
    "spotifyPlaylistId": null
  }, {
  
    "userName": "jhannee",
    "firstName": "Jordanna",
    "lastName": "Hanne",
    "email": "jhannee@discovery.com",
    "password": "mH0$(czx#p*",
    "profilePicUrl": "http://dummyimage.com/173x100.png/dddddd/000000",
    "spotifyLogin": false,
    "spotifyProfileId": null,
    "currentlyListeningId": 10,
    "spotifyPlaylistId": null
}];

const PostSeed = [{

    "userId": 6,
    "trackId": 7,
    "bodyText": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    "attachPhoto": false,
    "photoUrl": null,
    "likesCount": 13
  }, {

    "userId": 1,
    "trackId": 4,
    "bodyText": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
    "attachPhoto": true,
    "photoUrl": "http://dummyimage.com/195x100.png/5fa2dd/ffffff",
    "likesCount": 15
  }, {

    "userId": 12,
    "trackId": 4,
    "bodyText": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
    "attachPhoto": true,
    "photoUrl": "http://dummyimage.com/140x100.png/5fa2dd/ffffff",
    "likesCount": 15
  }, {

    "userId": 5,
    "trackId": 1,
    "bodyText": "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    "attachPhoto": false,
    "photoUrl": null,
    "likesCount": 7
  }, {

    "userId": 8,
    "trackId": 9,
    "bodyText": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
    "attachPhoto": false,
    "photoUrl": null,
    "likesCount": 5
  }, {

    "userId": 3,
    "trackId": 4,
    "bodyText": "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
    "attachPhoto": true,
    "photoUrl": "http://dummyimage.com/204x100.png/5fa2dd/ffffff",
    "likesCount": 8
  }, {

    "userId": 7,
    "trackId": 8,
    "bodyText": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    "attachPhoto": true,
    "photoUrl": "http://dummyimage.com/171x100.png/ff4444/ffffff",
    "likesCount": 14
  }, {

    "userId": 1,
    "trackId": 9,
    "bodyText": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
    "attachPhoto": true,
    "photoUrl": "http://dummyimage.com/227x100.png/5fa2dd/ffffff",
    "likesCount": 11
  }, {

    "userId": 1,
    "trackId": 9,
    "bodyText": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    "attachPhoto": false,
    "photoUrl": null,
    "likesCount": 15
  }, {
  
    "userId": 8,
    "trackId": 9,
    "bodyText": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
    "attachPhoto": true,
    "photoUrl": "http://dummyimage.com/128x100.png/ff4444/ffffff",
    "likesCount": 4
}];

const ConversationSeed = [{

    "user1Id": 1,
    "user2Id": 10
  }, {

    "user1Id": 4,
    "user2Id": 15
  }, {

    "user1Id": 5,
    "user2Id": 14
  }, {

    "user1Id": 3,
    "user2Id": 8
}, {
    
    "user1Id": 1,
    "user2Id": 4
    }];

const MessageSeed = [{

    "text": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    "userId": 8,
    "conversationId": 4
  }, {

    "text": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    "userId": 10,
    "conversationId": 1
  }, {

    "text": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    "userId": 1,
    "conversationId": 1
  }, {

    "text": "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    "userId": 5,
    "conversationId": 3
  }, {

    "text": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
    "userId": 10,
    "conversationId": 1
  }, {

    "text": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
    "userId": 3,
    "conversationId": 4
  }, {

    "text": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    "userId": 1,
    "conversationId": 5
  }, {

    "text": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
    "userId": 4,
    "conversationId": 5
  }, {

    "text": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    "userId": 1,
    "conversationId": 5
  }, {
  
    "text": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    "userId": 15,
    "conversationId": 2
  }, {
  
    "text": "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
    "userId": 15,
    "conversationId": 2
  }, {
  
    "text": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
    "userId": 1,
    "conversationId": 1
  }, {
  
    "text": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    "userId": 1,
    "conversationId": 5
  }, {
  
    "text": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
    "userId": 1,
    "conversationId": 5
  }, {
  
    "text": "Fusce consequat. Nulla nisl. Nunc nisl.",
    "userId": 4,
    "conversationId": 5
  }, {
  
    "text": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
    "userId": 15,
    "conversationId": 2
  }, {
  
    "text": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    "userId": 10,
    "conversationId": 1
  }, {
  
    "text": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
    "userId": 4,
    "conversationId": 5
  }, {
  
    "text": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    "userId": 14,
    "conversationId": 3
  }, {
  
    "text": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    "userId": 15,
    "conversationId": 2
  }, {
  
    "text": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
    "userId": 1,
    "conversationId": 5
  }, {
  
    "text": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
    "userId": 1,
    "conversationId": 1
  }, {
  
    "text": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
    "userId": 4,
    "conversationId": 5
  }, {
  
    "text": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    "userId": 1,
    "conversationId": 5
  }, {
  
    "text": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
    "userId": 4,
    "conversationId": 5
  }, {
  
    "text": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
    "userId": 1,
    "conversationId": 5
  }, {
  
    "text": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
    "userId": 4,
    "conversationId": 5
  }, {
  
    "text": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    "userId": 14,
    "conversationId": 3
  }, {
  
    "text": "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
    "userId": 4,
    "conversationId": 5
  }, {
  
    "text": "In congue. Etiam justo. Etiam pretium iaculis justo.",
    "userId": 1,
    "conversationId": 5
}];

const LikeSeed = [{

    "userId": 15,
    "postId": 1
  }, {

    "userId": 5,
    "postId": 2
  }, {

    "userId": 1,
    "postId": 5
  }, {

    "userId": 8,
    "postId": 2
  }, {

    "userId": 11,
    "postId": 4
  }, {

    "userId": 4,
    "postId": 1
  }, {

    "userId": 7,
    "postId": 1
  }, {

    "userId": 1,
    "postId": 1
  }, {

    "userId": 2,
    "postId": 5
  }, {

    "userId": 9,
    "postId": 7
  }, {

    "userId": 1,
    "postId": 4
  }, {

    "userId": 7,
    "postId": 3
  }, {

    "userId": 4,
    "postId": 3
  }, {

    "userId": 12,
    "postId": 3
  }, {

    "userId": 13,
    "postId": 9
}];

const FollowSeed = [{
    "followerId": 6,
    "followingId": 11
  }, {
    "followerId": 7,
    "followingId": 8
  }, {
    "followerId": 5,
    "followingId": 11
  }, {
    "followerId": 4,
    "followingId": 13
  }, {
    "followerId": 2,
    "followingId": 8
  }, {
    "followerId": 7,
    "followingId": 15
  }, {
    "followerId": 6,
    "followingId": 12
  }, {
    "followerId": 3,
    "followingId": 8
  }, {
    "followerId": 6,
    "followingId": 15
  }, {

    "followerId": 2,
    "followingId": 15
  }, {

    "followerId": 3,
    "followingId": 9
  }, {

    "followerId": 4,
    "followingId": 11
  }, {

    "followerId": 1,
    "followingId": 12
  }, {

    "followerId": 4,
    "followingId": 1
  }, {

    "followerId": 3,
    "followingId": 14
  }, {

    "followerId": 5,
    "followingId": 13
  }, {

    "followerId": 2,
    "followingId": 9
  }, {

    "followerId": 7,
    "followingId": 1
  }, {

    "followerId": 5,
    "followingId": 15
  }, {

    "followerId": 7,
    "followingId": 14
}];

const CommentSeed = [{
    "text": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
    "userId": 6,
    "postId": 3,
    "parentId": 14
  }, {
    "text": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    "userId": 4,
    "postId": 4,
    "parentId": 29
  }, {
    "text": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    "userId": 5,
    "postId": 9,
    "parentId": 17
  }, {
    "text": "In congue. Etiam justo. Etiam pretium iaculis justo.",
    "userId": 3,
    "postId": 8,
    "parentId": 29
  }, {
    "text": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
    "userId": 2,
    "postId": 3,
    "parentId": null
  }, {
    "text": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
    "userId": 5,
    "postId": 2,
    "parentId": null
  }, {
    "text": "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    "userId": 9,
    "postId": 1,
    "parentId": 12
  }, {
    "text": "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
    "userId": 12,
    "postId": 4,
    "parentId": 9
  }, {
    "text": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    "userId": 6,
    "postId": 6,
    "parentId": 18
  }, {

    "text": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    "userId": 12,
    "postId": 1,
    "parentId": 22
  }, {

    "text": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    "userId": 3,
    "postId": 4,
    "parentId": 10
  }, {

    "text": "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
    "userId": 1,
    "postId": 6,
    "parentId": 13
  }, {

    "text": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
    "userId": 13,
    "postId": 7,
    "parentId": 24
  }, {

    "text": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    "userId": 3,
    "postId": 5,
    "parentId": 30
  }, {

    "text": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    "userId": 15,
    "postId": 4,
    "parentId": 17
  }, {

    "text": "In congue. Etiam justo. Etiam pretium iaculis justo.",
    "userId": 1,
    "postId": 5,
    "parentId": null
  }, {

    "text": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    "userId": 3,
    "postId": 2,
    "parentId": 6
  }, {

    "text": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
    "userId": 13,
    "postId": 4,
    "parentId": 19
  }, {

    "text": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    "userId": 10,
    "postId": 7,
    "parentId": 5
  }, {

    "text": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    "userId": 7,
    "postId": 5,
    "parentId": 5
  }, {

    "text": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
    "userId": 3,
    "postId": 5,
    "parentId": 23
  }, {

    "text": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    "userId": 13,
    "postId": 4,
    "parentId": 30
  }, {

    "text": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
    "userId": 6,
    "postId": 3,
    "parentId": 21
  }, {

    "text": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    "userId": 7,
    "postId": 5,
    "parentId": null
  }, {

    "text": "In congue. Etiam justo. Etiam pretium iaculis justo.",
    "userId": 8,
    "postId": 1,
    "parentId": 10
  }, {

    "text": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
    "userId": 12,
    "postId": 6,
    "parentId": 2
  }, {

    "text": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
    "userId": 14,
    "postId": 1,
    "parentId": 6
  }, {

    "text": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
    "userId": 11,
    "postId": 1,
    "parentId": null
  }, {

    "text": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
    "userId": 4,
    "postId": 7,
    "parentId": 22
  }, {

    "text": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    "userId": 5,
    "postId": 7,
    "parentId": null
}];

const seed = async() => {
    await db.sync({force: true});
    await Track.bulkCreate(TrackSeed);
    await User.bulkCreate(UserSeed);
    
    await Post.bulkCreate(PostSeed);
    await Conversation.bulkCreate(ConversationSeed);
    await Message.bulkCreate(MessageSeed);
    await Follow.bulkCreate(FollowSeed);
    await Like.bulkCreate(LikeSeed);
    await Comment.bulkCreate(CommentSeed);
}
seed().then(() => process.exit());

  




  
  

