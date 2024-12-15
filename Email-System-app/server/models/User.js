const Person = require("./Person");
const emails = require("../Schemas/emailSchema.js");
const folders = require("../Schemas/folderSchema.js");
//inherts from person
class User extends Person {
  constructor(
    id,
    username,
    email,
    password,
    location,
    activeStatus,
    profileImage
  ) {
    super(id, username, email, password);
    this.location = location;
    this.activeStatus = activeStatus;
    this.profileImage = profileImage;
  }

async createFolder(folderName,userEmail){
    
      
    const folderT = {
    name:folderName,
    isCustom:true,
    userEmail:userEmail}
    
    const folder =new folders(folderT);
    await folder.save();
}
async deleteFolder(folderId){
await folders.deleteOne({_id:folderId})
}
async renameFolder(id,newName){
await folders.updateOne({_id:id},{name:newName});
}
async moveToSpam(userId,emailId,folderName){
await folders.updateOne({userEmail:userId,name:"Spam"},{$push:{emailsArray:emailId}});
await folders.updateOne({userEmail : userId,name:folderName},{$pull:{emailsArray:emailId}});

}
async moveToFolder(userId,emailId,Fname1,Fname2){
await folders.updateOne({userEmail:userId,name:Fname2},{$push:{emailsArray:emailId}});
await folders.updateOne({userEmail : userId,name:Fname1},{$pull:{emailsArray:emailId}});

}
async moveToArchive(userId,emailId,folderName){
await folders.updateOne({userEmail:userId,name:"Archive"},{$push:{emailsArray:emailId}});
await folders.updateOne({userEmail : userId,name:folderName},{$pull:{emailsArray:emailId}});

}
async moveToDraft(userId,emailId,folderName){
await folders.updateOne({userEmail:userId,name:"Draft"},{$push:{emailsArray:emailId}});
await folders.updateOne({userEmail : userId,name:folderName},{$pull:{emailsArray:emailId}});

}
async moveToRecycle(userId,emailId,folderId){

await folders.updateOne({userEmail:userId,name:"RecycleBin"},{$push:{emailsArray:emailId}});
await folders.updateOne({_id : folderId},{$pull:{emailsArray:emailId}});

}
async RecoverEmail(userId,emailId,status){

await folders.updateOne({userEmail:userId,name:"RecycleBin"},{$pull:{emailsArray:emailId}});

await folders.updateOne({userEmail:userId,name:status},{$push:{emailsArray:emailId}});

}
async RecoverEmail2(userId,emailId,Fname2,Fname1){

await folders.updateOne({userEmail:userId,name:Fname1},{$pull:{emailsArray:emailId}});

await folders.updateOne({userEmail:userId,name:Fname2},{$push:{emailsArray:emailId}});

}

//recover to the same spot

async search(searchWord){
  const res = await emails.find(
    {"$or":[
      {supject:{$regex:searchWord}}
    ]
  })
    return res;
}


}

module.exports = User;
