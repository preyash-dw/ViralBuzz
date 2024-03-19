module.exports={
    module:{
        rules:[
            {
                test: /\.(png|jpe?g|gif)$i,
                use:[
                    {
                        loader:'file-loader',
                        option:{
                            name:'[name].[ext]',
                            outputPath:'images'
                        },
                    },
                ],

            },
        ],
    },
};