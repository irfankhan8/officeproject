import invitation from "../model/Invitation.js"
export const invitationcreate = async (req, res) => {
  try {
    const invitlinkCheck = await invitation.findOne({
      $or: [{ invitationlink: req.body.invitationlink }],
    });

    if (invitlinkCheck) {
      res.status(404).send({ status: false, msg: "Invitation link already exists" });
    } else {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const codeLength = 8;
      let code = "";

      for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
      }
      const createInvitation = await invitation.create(req.body);

      res.status(201).send(
        {
          status: true,
          msg: "Invitation link successfully created",
          data: createInvitation,
          code: code,
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, msg: "Internal server error" });
  }
};



/////////////////////acceptInvitation///////////////////
export const acceptInvitation = async (req, res) => {
  try {
    const acceptlinkcheckId = await invitation.findById(req.params._id);
    if (acceptlinkcheckId) {

      return res.status(400).send({ status: false, msg: "Invitation is already accept" })

    } else {

      res.status(202).send({ status: true, msg: "acceptInvitation successfully", data: acceptlinkcheckId })
    }
  } catch (err) {
    console.log(err)
  }
}

////////////getInvitationsByUser://////////

export const InvitationAllData = async (req, res) => {
  try {
    const InvitationFindData = await invitation.find()
    if (!InvitationFindData) {

      res.status(404).send(
        {
          status: false,
          msg: "Invitation not found"
        })

    }
    res.status(200).send(
      {
        status: true,
        msg: "InvitationAllData successfully",
        data: InvitationFindData
      })
  } catch (err) {
    console.log(err)
  }
}


////////////////cancelInvitation: /////////////////

export const cancelInvitation = async (req, res) => {
  try {
    //InvitationLInk Id SE CHECK 
    const InvitationLinkCheck = await invitation.findById(req.params._id)
    if (!InvitationLinkCheck) {

      return res.status(404).send({ status: false, msg: "InvitationLink not send" })

    }
    if (InvitationLinkCheck.status !== "pading") {
      return res.status(306).send
        ({ status: true, msg: "This invitation link has been cancel successfully", data: InvitationLinkCheck })
    } else
      if (InvitationLinkCheck.status == "pading") {
        return res.status(501).send({ status: false, msg: "invitation status can't be pading" })

      }
  } catch (err) {
    console.log(err)
  }
}



