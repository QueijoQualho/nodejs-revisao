import { validationResult } from "express-validator"

function getPosts(req, res, next) {
    res.status(200).json({
        posts: [
            {
                title: "Primeiro post",
                content: "Este é o meu primeiro post!"
            }
        ]
    })
}

function createPost(req, res, next) {
    const title = req.body.title
    const content = req.body.content

    const erros = validationResult(req)

    if(!erros.isEmpty()){
        const error = new Error("Validação deu errado")
        error.status = 422
        throw error
    }

    if (!title || !content) {
        res.status(400).json({
            error: true,
            msg: "Você precisa enviar os dados corretamente"
        })
    }

    res.status(201).json({
        error: false,
        msg: "Post criado com sucesso"
    })


}

function deletePost(req, res, next) {
    const id = req.params.id;

    if (!id) {
        res.status(400).json({
            error: true,
            msg: "O parametro de ID do post não foi enviado"
        })
    }

    res.status(201).json({
        error: "false",
        msg: `O post ${id} foi deletado`
    })
}

function patchPost(req, res, next) {
    const id = req.params.id;

    if (!id) {
        res.status(400).json({
            error: true,
            msg: "O parametro de ID do post não foi enviado"
        })
    }

    res.status(201).json({
        error: "false",
        msg: `O post ${id} foi alterado`
    })
}

export { getPosts, createPost, deletePost, patchPost};
