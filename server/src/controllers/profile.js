const Profile = require("../models/profile");
const { generateToken } = require("../utilities/auth");

async function create(request, response, next){
    const profile = await Profile.add(request.body)
        .catch(error => next(error));

    response.status(201).json({
        data: profile,
        jwt: generateToken(profile),
    });
}

async function read(request, response, next){
    const profiles = await Profile.find(request.params.id)
        .catch(error => next(error));

    response.status(200).json({
        data: profiles
    });
}

async function update(request, response, next){
    const profile = await Profile.update(request.params.id, request.body)
        .catch(error => next(error));

    response.status(200).json({
        data: profile
    });
}

async function destroy(request, response, next){
    await Profile.remove(request.params.id)
        .catch(error => next(error));

    response.status(204).send();
}

async function list(request, response, next){
    const profiles = await Profile.find()
        .catch(error => next(error));

    response.status(200).json({
        data: profiles
    });
}

async function isEmailUnique(request, response, next){
    const profile = await Profile.query({email: request.body.email})
        .catch(error => next(error));
    const status = !profile
        ? 200
        : 400;

    response.status(status).send();
}

module.exports = {
    create,
    read,
    update,
    destroy,
    list,
    isEmailUnique,
};
