(function() {
    "use strict";
    angular.module('app.dmc').factory('GraphService', ['$rootScope',
        function($rootScope) {

//        var self = this;
        // Define the zoom function for the zoomable tree

        function zoom() {
            svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }

//        var margin = {top: 20, right: 10, bottom: 20, left: 10};
        var PointColors = ['lightsteelblue', 'lightgreen'];
        //d3.json("erData.json", function(json) {

        var w = 1800,
            h = 1900,
            i = 0,
            duration = 500,
            root, tree, diagonal, zoomListener, vis, svgGroup;

        function initialize(){
        //      var tree = d3.layout.tree().size([h, w - 160]);
        tree = d3.layout.tree().size([h, w - 160]);

        diagonal = d3.svg.diagonal()
            .source(function (d) {
                return {
                    "x": d.source.x + d.source.height / 2,
                    "y": d.source.y + 150
                };
            })
            .target(function (d) {
                return {
                    "x": d.target.x + d.target.height / 2,
                    "y": d.target.y + 100
                };
            })
            .projection(function (d) {
                return [d.x + 15, d.y - 30];
            });
        /*
         function pan(domNode, direction) {
         var speed = panSpeed, translateX, translateY;
         if (panTimer) {
         clearTimeout(panTimer);
         var translateCoords = d3.transform(svgGroup.attr("transform"));
         if (direction === 'left' || direction === 'right') {
         translateX = direction === 'left' ? translateCoords.translate[0] + speed : translateCoords.translate[0] - speed;
         translateY = translateCoords.translate[1];
         } else if (direction === 'up' || direction === 'down') {
         translateX = translateCoords.translate[0];
         translateY = direction === 'up' ? translateCoords.translate[1] + speed : translateCoords.translate[1] - speed;
         }
         var scaleX = translateCoords.scale[0];
         var scaleY = translateCoords.scale[1];
         scale = zoomListener.scale();
         svgGroup.transition().attr("transform", "translate(" + translateX + "," + translateY + ")scale(" + scale + ")");
         d3.select(domNode).select('g.node').attr("transform", "translate(" + translateX + "," + translateY + ")");
         zoomListener.scale(zoomListener.scale());
         zoomListener.translate([translateX, translateY]);

         var panTimer = setTimeout(function() {
         pan(domNode, speed, direction);
         }, 50);

         }
         }
         */

        // define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
        zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", zoom);

        vis = d3.select('#erDiagram').append("svg:svg")
            .attr("width", w)
            .attr("height", h)
            .attr("transform", "translate(0,0)")
            .call(zoomListener);

        svgGroup = vis.append("g");
    }

        function update(source) {
            var nodes = tree.nodes(root).reverse();

            var node = svgGroup.selectAll("g.node")
                .data(nodes, function (d) {
                    return d.id || (d.id = ++i);
                });

            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function () {
                    return "translate(" + source.x0 + "," + source.y0 + ")";
                });

            nodeEnter.append("svg:rect")
                .attr("width", 150)
                .attr("height", 500)
                .attr('y', 0)
                .attr('rx', 5)
                .attr('ry', 5)
                .attr('stroke', 'black')
                .attr('stroke-width', '3px')
                .attr('fill', 'white')
                .attr("id", function (d) {
                    return d._children;
                })
                .style("fill", function (d) {
                    return d._children ? "white" : "white";
                })
                // .on("click", click);
                .on("click", function(){
                    PointColors = [PointColors[1], PointColors[0]];
                    d3.select(this).style("fill", PointColors[0]);
                    var aaaaa = this.nextSibling.children[0].innerHTML;
 //                   debugger;
                    $rootScope.$broadcast('setAnchors', aaaaa)

                })
                .on({
                    "mouseover": function() {
                        d3.select(this).style("cursor", "pointer");
                    },
                    "mouseout": function() {
                        d3.select(this).style("cursor", "default");
                    }
                });

            nodeEnter.append("text")
                .attr("x", function (d) {
                    return d._children ? -8 : 8;
                })
                .attr("y", 3)
                .attr("dy", "0.68em")
                .text(function (d) {
                    return d.name;
                });

            wrap(d3.selectAll('text'), 150);

            nodeEnter.transition()
                .duration(duration)
                .attr("transform", function (d) {
                    return "translate(" + (d.x-50) + "," + (d.y+50) + ")";
                })
                .style("opacity", 1)
                .select("rect")

                .style("fill", "lightsteelblue");

            node.transition()
                .duration(duration)
                .attr("transform", function (d) {
                    return "translate(" + (d.x-50) + "," + (d.y+50) + ")";
                })
                .style("opacity", 1);


            node.exit().transition()
                .duration(duration)
                .attr("transform", function () {
                    return "translate(" + source.y + "," + source.x + ")";
                })
                .style("opacity", 1e-6)
                .remove();

            var link = svgGroup.selectAll("path.link")
                .data(tree.links(nodes), function (d) {
                    return d.target.id;
                });

            svgGroup.selectAll("path.link").attr();
            link.enter().insert("svg:path", "g")
                .attr("class",  function (d) {
                    if(d.source && d.source.name && root.name &&d.source.name === root.name){
                        return "link_dashed";
                    }else{
                        return "link_continuous";
                    }
                })
                .attr("marker-mid","ArrowHead")
                //return (d.source != root) ? "link_dashed" : "link_continuous" ; })
                .attr("d", function () {
                    var o = {
                        x: source.x0,
                        y: source.y0,
                        height: source.height
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                })

                .transition()
                .duration(duration)
                .attr("d", diagonal);


            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            link.exit().transition()
                .duration(duration)
                .attr("d", function () {
                    var o = {
                        x: source.x,
                        y: source.y
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                })
                .remove();


            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

/*
        function click(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }
*/

        function wrap(text, width) {
            text.each(function (d) {
                var text = d3.select(this),

                    words = d.name.split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1,
                    y = text.attr("y"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em").attr('font-weight', 'bold').attr('fill','blue');
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                    }

                    if(d.columns){
                        d.columns.forEach(function(c){
                            dy = dy + 1;
                            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em").text(c.name);
                        });
                    }
                }

                var textBox = text.node().getBBox();

                d.height = 19 * (lineNumber + 1);
                d3.select(this.parentNode.children[0]).attr('height', textBox.height);

            });
        }

        function buildGraph(erData) {
            initialize();
            root = erData[0];
            root.x0 = h / 2;
            root.y0 = 0;
            update(root);
        }

        return {
            buildGraph: buildGraph
        };

    }]);
})();
