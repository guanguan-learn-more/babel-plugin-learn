const { declare } = require('@babel/helper-plugin-utils');
const fse = require('fs-extra');
const path = require('path');
const generate = require('@babel/generator').default;




const autoTrackPlugin = declare((api,options,dirname)=>{

    return {
        pre(file){
            console.log('===>pre')

        },
        visitor:{
            Program:{
                enter(){
                    console.log('======> enter');
                    
                    path.traverse({
                        ImportDeclaration(p){
                            const importName = p.get('source').value;
                            if(importName === 'initl'){

                            }
                        }
                    })
                },
            }
        },
    }
})

module.exports = autoTrackPlugin;