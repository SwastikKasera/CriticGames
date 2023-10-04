const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');


async function startServer() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2321db1c72msh7b8f2b739da1218p1ce30bjsn9280b27213f6',
            'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
        }
    };

    const app = express();
    const server = new ApolloServer({
        typeDefs: `
            type Image {
                og: String
                sm: String
            }

            type popularGames {
                id: ID!
                name: String!
                tier: String!
                topCriticScore: Float!
                images: Image!
            }
            type recentRelease {
                id:ID!
                name:String!
                firstReleaseDate: String!
                tier: String!
                images: Image!
                topCriticScore:Int!
            }
            type gameReviews  {
                id:ID!
                title:String!
                externalUrl:String!
                desc:String!
                score:Int!
                publishDate:String!
                npScore:Int!
                language:String!
            }

            type Query {
                popularGames: [popularGames]
                recentRelease: [recentRelease]
                gameReviews(gameid : ID!): [gameReviews]
            }
        `,
        resolvers: {
            Query: {
                popularGames: async () => {
                    try {
                        const response = await axios.get('https://opencritic-api.p.rapidapi.com/game/popular', options);
                        const gamesData = response.data;
                        // Map the response data to match your GraphQL schema
                        return gamesData.map((game) => ({
                            id: game.id.toString(),
                            name: game.name,
                            tier: game.tier,
                            topCriticScore: parseFloat(game.topCriticScore),
                            images: {
                                // og: game.images.box.og === null ? game.images.box.og : "No image found",
                                og: game.images.box.og ? game.images.box.og : "No image found",
                                sm: game.images.box.sm ? game.images.box.sm : "No image found",
                            },
                        }));
                    } catch (error) {
                        console.error('Error fetching data from OpenCritic API:', error);
                        throw error;
                    }
                },
                recentRelease: async () => {
                    try {
                        const response = await axios.get('https://opencritic-api.p.rapidapi.com/game/recently-released', options);
                        const gamesData = response.data;
                
                        return gamesData.map((game) => ({
                            id: game.id.toString(),
                            name: game.name,
                            firstReleaseDate: game.firstReleaseDate,
                            tier: game.tier,
                            images: {
                                og: game.images.box.og,
                                sm: game.images.box.sm,
                            },
                            topCriticScore: game.topCriticScore,
                        }));
                    } catch (error) {
                        console.error('Error fetching data from OpenCritic API:', error);
                        throw error;
                    }
                },
                gameReviews: async ( _ ,{gameid})=>{
                    try {
                        const response = await axios.get(`https://opencritic-api.p.rapidapi.com/reviews/game/${gameid}`, {
                            method: 'GET',
                            params: {
                                sort: 'popularity'
                            },
                            headers: {
                                'X-RapidAPI-Key': '2321db1c72msh7b8f2b739da1218p1ce30bjsn9280b27213f6',
                                'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
                            }
                        })
                        const gamesData = response.data
                        return gamesData.map((game)=>({
                            id:game._id,
                            title:game.title,
                            externalUrl:game.externalUrl,
                            desc:game.snippet,
                            score:game.score,
                            publishDate: game.publishedDate,
                            npScore:game.npScore,
                            language: game.language
                        }))
                    } catch (error) {
                        console.error('Error fetching Game Reviews:', error);
                        throw error;
                    }
                }
            },
        },
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();
    app.use('/graphql', expressMiddleware(server));

    app.listen(5000, () => {
        console.log("Server started at port 5000");
    });
}

startServer();
