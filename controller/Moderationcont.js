import banUser from "../model/UserBan.js";
import ReportPost from "../model/ReportPost.js";
import ReportCommit from "../model/ReportCommit.js"

export const BanUsers = async (req, res) => {
    try {
        const banUserId = await banUser.findById({ _id: req.body._id });
        //console.log(req.body._id)
        if (!banUserId) {
            return res.status(404).send(
                {
                    status: false,
                    msg: 'User not found!',
                    data: null
                })

        }

        await banUser.findOneAndUpdate(
            { _id: banUserId._id },
            { banned: true },
            { new: true },
            req.body);
        banUserId.reason = req.body.reason
        res.status(200).send(
            {
                status: true,
                msg: "User is Successfully banned",
                data: banUserId
            })

    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: "Internal server error", data: null });
    }
}  /////////data table join kerna hai subreddit


/////ubBanUser////////////////////////
export const UnBanUser = async (req, res) => {
    try {

        const unbanUserId = await banUser.findById({ _id: req.body._id });
        //  console.log(req.body._id)
        if (!unbanUserId) {
            return res.status(404).send({ status: false, msg: "User not found!", data: null })

        }
        await banUser.findOneAndUpdate(
            { _id: unbanUserId._id },
            { banned: false },
            { new: true }, req.body);
        unbanUserId.reason = req.body.reason

        res.status(200).send(
            {
                status: true,
                msg: "User is Successfully banned",
                data: unbanUserId
            })

    } catch (err) {
        console.log(err)
        res.status(500).send(
            {
                status: false,
                msg: "Internal server error",
                data: null
            });
    }
}


/////////////reportPost://///////////
export const reportPost = async (req, res) => {
    try {
        const createReportPost = await ReportPost.create(req.body)
        res.send({
            status: true,
            msg: 'createReportPost succssfully',
            data: createReportPost
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            status: false,
            msg: 'somthing went wrong',
            data: error
        })
    }
}

/////////////////////////////////reportComment: /////////////////
export const reportComment = async (req, res) => {
    try {
        const createReportComment = await ReportCommit.create(req.body)
        res.send({
            status: true,
            msg: 'createReportCommit succssfully',
            data: createReportComment
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            status: false,
            msg: 'somthing went wrong',
            data: error
        })
    }
}

/////////////////approvePost: ////////////////

export const approvePost = async (req, res) => {
    try {
        const PostId = req.params._id
        const approvePost = await ReportPost.findById(PostId)
        if (!approvePost) {
            return res.status(404).send(
                {
                    status: false,
                    msg: "Post to approve not found"
                })

        }
        if (approvePost.isApproved) {

            return res.status(400).send({ status: false, msg: "Post is already approved" })

        }
        approvePost.isReported = false;
        approvePost.isApproved = true;

        await approvePost.save()
        return res.status(201).send({ status: true, msg: " Post approved Successfully" })

    } catch (err) {
        console.log(err)
    }
}



///////////approveCommite /////////
export const approveCommit = async (req, res) => {
    try {
        const CommitId = req.params._id
        const approveCommit = await ReportPost.findById(CommitId)
        if (!approveCommit) {
            return res.status(404).send({ status: false, msg: "approve Commite not found" })

        }
        if (approveCommit.isApproved) {

            return res.status(400).send({ status: false, msg: "approve Commite is alredy commit" })

        }
        approveCommit.isReported = false;
        approveCommit.isApproved = true;

        await approvePost.save()
        return res.status(201).send({ status: true, msg: "approve Commite is succefully" })

    } catch (err) {
        console.log(err)
    }
}