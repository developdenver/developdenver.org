const express = require("express");
const router = express.Router();

const Profile = require("../models/profile");

module.exports = (app) => {
    router.get("/", async (request, response, next) => {
        try {
            const profiles = await Profile.list();

            response.status(200).json({
                data: profiles
            });
        } catch(error){next(error);}
    });
    router.get("/:id", async (request, response, next) => {
        try {
            const profiles = await Profile.find(request.params.id);

            response.status(200).json({
                data: profiles
            });
        } catch(error){next(error);}
    });
    router.post("/", async (request, response, next) => {
        try {
            const profile = await Profile.add(request.body);

            response.status(201).json({
                data: profile
            });
        } catch(error){next(error);}
    });
    router.delete("/:id", async (request, response, next) => {
        try {
            await Profile.remove(request.params.id);

            response.status(204).send();
        } catch(error){next(error);}
    });
    router.put("/:id", async (request, response, next) => {
        try {
            const profile = await Profile.update(request.params.id, request.body);

            response.status(200).json({
                data: profile
            });
        } catch(error){next(error);}
    });

    return router;
};
