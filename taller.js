﻿var restify = require('restify'); //web server restify
var builder = require('botbuilder');
// node-emoji libreria 

//Crear servidor
var server = restify.createServer();

//se escucha en distintos puertos, particularmente en el 3978
server.listen(
    process.env.port || 
    process.env.PORT || 
    3978, function(){
        console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

var bot = new builder.UniversalBot(connector);
server.post('api/messages', connector.listen());

// Diálogos
bot.dialog('/',[  // Primer dialogo o dialogo raìz, se crea dentro del bot
    function(session,result,next){
        if(!session.userData.nombre){// preguntar si sabemos el nombre
        builder.Prompts.text(session, '¿cual es tu nombre?');
    }
    else{
        next();//Pasamos al siguiente metodo de la cascada llamada next()
    }
    
    },
    function(session,results){
        if(results.response){
            let msj = results.response;
            session.userData.nombre = msj;
        }
        session.send(`Hola ${session.userData.nombre}! Mucho Gusto` );
        session.beginDialog('/preguntarLugar');
  },

        ]);
        
    bot.dialog('/preguntarLugar', [
         function (session) {
        builder.Prompts.text(session, '¿Dónde te encuentras?');
        },
        function (session, results) {
        session.dialogData.lugar = results.response;
        
         session.endDialog(`Saludos por ${session.dialogData.lugar}`);
        session.beginDialog('/preguntarComida');
        },
        ]);

        bot.dialog('/preguntarComida', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Cual Es tu Helado Favorito?');
            },
            function (session, results){
                let comida = results.response;
                session.endConversation(`${comida} Es Delicioso, Me Gusta`);
                session.beginDialog('/preguntarEdad');
            }
        ]);
        bot.dialog('/preguntarEdad', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Una Pregnta, Cual es tu edad?');
            },
            function (session, results){
                let Años = results.response;
                session.endConversation(`Jajaja ${Años} Estas Viejo, Es broma`);
                session.beginDialog('/preguntarhobie');
            }
        ]);
        bot.dialog('/preguntarhobie', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Cuál es tu deporte favorito?');
            },
            function (session, results){
                let hobie = results.response;
                session.endConversation(`${hobie}?, Enserio, no hay algo mejor`);
                session.beginDialog('/preguntarEquipo');
            }
        ]);
        
        bot.dialog('/preguntarEquipo', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Que Equipo de Colombia te gusta?');
            },
            function (session, results){
                let equipo = results.response;
                session.endConversation(` del ${equipo}?, El Mejor es el Cali`);
                session.beginDialog('/preguntarEstudio');
            }
        
        ]);
        bot.dialog('/preguntarEstudio', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Donde Estas Estudiando?');
            },
            function (session, results){
                let universidad = results.response;
                session.endConversation(`En ${universidad}, Excelente`);
                session.beginDialog('/preguntarqueestudias');
            }
        
        ]);
        bot.dialog('/preguntarqueestudias', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Que estas estudiando?');
            },
            function (session, results){
                let carrera = results.response;
                session.endConversation(`me alegro, muy buena carrera ${carrera}`);
                session.beginDialog('/preguntarporsemestre');
            }
        
        ]);
        bot.dialog('/preguntarporsemestre', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Cuantos Semestres Llevas?');
            },
            function (session, results){
                let semestre = results.response;
                session.endConversation(`${semestre}? Ya Casi Terminas`);
                session.beginDialog('/preguntarcelular');
            }
        
        ]);
        bot.dialog('/preguntarcelular', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Cual Celular Te Gusta?');
            },
            function (session, results){
                let celular = results.response;
                session.endDialog(`${celular} Son Caros`);
                session.beginDialog('/preguntarmoto');
            }
        
        ]);
        bot.dialog('/preguntarmoto', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿te gustan las motos?');
            },
            function (session, results){
                let moto = results.response;
             
                if(moto == 'si' || moto == 'SI'){
                    session.endConversation(`${moto} Muy Bien`);
                    session.beginDialog('/Que Moto');
                }else{
                    session.endConversation(`${moto} Que Mal Pri `);
                    
                }
            }
        ]);
        bot.dialog('/tegustapasear', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿a que cuidades haz ido de paseo?');
            },
            function (session, results){
                let viaje = results.response;
                session.endConversation(`${viaje} pasear es lo mejor parce`);
                session.beginDialog('/preguntarhijos');
            }
        
        ]);
    