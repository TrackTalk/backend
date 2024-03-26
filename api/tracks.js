const router = require("express").Router();
const {Track} = require("../db/models");

//root is localhost:8000/api/tracks

router.get("/", async (req, res, next) => {
    try {
        const allTracks = await Track.findAll();

        if(allTracks) {
            res.status(200).json(allTracks);
        } else {
            res.status(404).send('No tracks found');
        }
    } catch (error) {
        next (error);
    }
});

router.get("/:trackId", async (req, res, next) => {
    try {
        const {trackId} = req.params;
        if(!trackId) return  res.status(400).send('Missing track ID');
        const singleTrack = await Track.findByPk(trackId);

        if(singleTrack){
            res.status(200).json(singleTrack);
        } else {
            res.status(404).send(`The track with the id of ${trackId} does not exist.`);
        }

    } catch (error) {
        next (error);
    }
});

router.post("/create", async (req, res, next) => {
    try {
        const {newTrackData} = req.body 
        if(!newTrackData) return res.status(400).send('New track data missing');

        const newTrack = await Track.create(newTrackData, {
            returning: true,
        });

        if(newTrack){
            res.status(200).json(newTrack);
        } else {
            res.status(404).send(`Failed to create a new track`);
        }
    } catch (error) {
        next (error);
    }
});

router.delete("/:trackId/delete", async (req, res, next) => {
    try {
        const {trackId} = req.params;
        if(!trackId) return res.status(400).send("No track Id provided");

        const deletedTrack = await Track.destroy({
            where:{
                id : trackId
            }
        });
        if (deletedTrack) {
            res.status(200).json(deletedTrack);
        } else {
            res.status(404).send("The track with the given ID does not exist.");
        }

    } catch (error) {
        next (error);
    }
})
module.exports = router;