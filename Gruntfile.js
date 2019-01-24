module.exports = function(grunt) {
    //配置参数
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        fixturesPath: "src",
        uglify: {
            options: {
                esversion: 6,
                sourceMap:false,
                compress:true
            },
            dev:{
                files: {
                    'web/js/all.min.js':[
                        'node_modules/jquery/dist/jquery.js',
                        "node_modules/swiper/dist/js/swiper.js",
                        "node_modules/amazeui/dist/js/amazeui.js",
                        "node_modules/amazeui/dist/js/amazeui.widgets.helper.js",
                        "node_modules/amazeui/dist/js/amazeui.ie8polyfill.js",
                        'js/main.js'
                    ]
                }
            }
        },
        less: {
            options: {
                sourceMap:false,
                compress:true
            },
            dev:{
                files: {
                    'web/css/all.min.css':[
                        "node_modules/swiper/dist/css/swiper.css",
                        "node_modules/amazeui/dist/css/amazeui.css",
                        "src/less/common.less",
                        "src/less/index.less"
                    ]
                }
            }
        },
        imagemin:{
            dev:{
                options:{
                    optimizationLevel:1
                },
                files:[
                    {
                        expand:true,
                        cwd:'src/images/',
                        src:'**/*.{png,jpg,jpeg,svg,gif}',
                        dest:'web/images/'
                    },
                    {
                        expand:true,
                        cwd:'node_modules/amazeui/dist/fonts/',
                        src:'**/*.{otf,eot,ttf,woff,woff2}',
                        dest:'web/fonts'
                    }
                ]
            }
        },
        htmlbuild:{
            dev:{
                src:[
                    'src/templates/**/*.html'
                ],
                dest:'web',
                options:{
                    beautify: true,
                    relative: true,
                    basePath: false,
                    data:{
                        baseUrl:'http://www.minakevin.com'
                    },
                    scripts: {
                    },
                    styles: {
                        main: '<%= fixturesPath %>/css/all.min.css'
                    },
                    sections: {
                        views: '<%= fixturesPath %>/templates/**/*.htm',
                        templates: '<%= fixturesPath %>/templates/**/*.htm',
                        layout: {
                            meta:'<%= fixturesPath %>/templates/layout/meta.htm',
                            header:'<%= fixturesPath %>/templates/layout/header.htm',
                            footer:'<%= fixturesPath %>/templates/layout/footer.htm',
                            footBtnGroup:'<%= fixturesPath %>/templates/layout/foot-btn-group.htm',
                        }
                    }
                }
            }
        },
        // 监控
        watch: {
            scripts: {
                files: 'src/js/*.js',
                tasks: ['uglify:dev'],
                options: {
                    debounceDelay: 200
                }
            },
            less: {
                files: "src/less/**/*.less",
                tasks: ['less:dev'],
                options: {
                    debounceDelay: 200
                }
            },
            imagemin:{
                files:'src/images/**/*.{png,jpg,jpeg,svg}',
                tasks:['imagemin:dev'],
                options:{
                    debounceDelay: 200
                }
            },
            html:{
                files:'src/templates/**/*.{html,htm,ftl}',
                tasks:['htmlbuild:dev'],
                options:{
                    debounceDelay: 200
                }
            }
        },
        // 开发及预览
        browserSync: {
            dev:{
                bsFiles: {
                    src : 'web/**'
                },
                options: {
                    watchTask:true,
                    server: {
                        baseDir: "./web/",
                    }
                }
            }
        }
    });
    //     grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-html-build');
    grunt.loadNpmTasks('grunt-browser-sync');
// //注册任务
    grunt.registerTask('build', [ 'less:dev','uglify:dev','htmlbuild:dev'],'imagemin:dev');
    grunt.registerTask('js',['uglify:dev']);
    grunt.registerTask('css',['less:dev']);
    grunt.registerTask('img',['imagemin:dev']);
    grunt.registerTask('html',['htmlbuild:dev']);
    grunt.registerTask('start',['browserSync:dev','watch']);
};
