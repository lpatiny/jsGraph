---
layout: page-sidemenu
subtitle: 'Handling shapes (basic)'
---
## Handling shapes (basic)

<script>
	
</script>

jsGraph can be used not only to display data in series, but it can also be used to create shapes associated to this data. In this tutorial, we demonstrate how to create various shapes, position them on your graph, change their style and allow manipulation.

Let us start by creating an empty graph, and since no serie will be used for now, force the X and Y axes boundaries:


{%highlight javascript%}
var g = new Graph("example-1") // Creates a new graph
g.resize( 400, 300 ); // Resizes the graph
var s = g.newSerie("employment_nb").setData( [ 1900, 1555, 1910, 1783, 1920, 1872, 1930, 1943, 1941, 1992, 1948, 2378, 1949, 2339, 1950, 2309, 1951, 2437, 1953, 2455, 1954, 2482, 1955, 2533, 1956, 2606, 1957, 2666, 1958, 2644, 1959, 2644, 1960, 2717, 1961, 2644, 1962, 2954, 1963, 2999, 1964, 3046, 1965, 3025, 1966, 3014, 1967, 3030, 1968, 3048, 1969, 3098, 1970, 3143, 1971, 3199, 1972, 3243, 1973, 3277, 1974, 3273, 1975, 3108, 1976, 3019, 1977, 3032, 1978, 3062, 1979, 3095, 1980, 3166, 1981, 3240, 1982, 3256, 1983, 3257, 1984, 3288, 1985, 3354, 1986, 3430, 1987, 3515, 1988, 3607, 1989, 3704, 1990, 3821, 1991, 4136, 1992, 4069, 1993, 4025, 1994, 3999, 1995, 3996, 1996, 3994, 1997, 3991, 1998, 4044, 1999, 4075, 2000, 4116, 2001, 4183, 2002, 4213, 2003, 4198, 2004, 4210, 2005, 4241, 2006, 4328, 2007, 4440, 2008, 4548, 2009, 4588, 2010, 4593, 2011, 4705, 2012, 4776, 2013, 4837, 2014, 4918 ] )
  .autoAxis()
  .setLineColor('purple')
  .setLineWidth( 2 );
	
g.setTitle("Number of employed people in Switzerland (yearly average)");
g.getXAxis().setLabel('Year').gridsOff();
g.getYAxis().setLabel("Number of people (in thousands)").secondaryGridOff();
g.draw();
{%endhighlight%}


<div id="example-1" class="jsgraph-example"></div>
<script>

function makeGraph( dom ) {

	var g = new Graph( dom ) // Creates a new graph
	g.resize( 400, 300 ); // Resizes the graph
	var s = g.newSerie("employment_nb").setData( [ 1900, 1555, 1910, 1783, 1920, 1872, 1930, 1943, 1941, 1992, 1948, 2378, 1949, 2339, 1950, 2309, 1951, 2437, 1953, 2455, 1954, 2482, 1955, 2533, 1956, 2606, 1957, 2666, 1958, 2644, 1959, 2644, 1960, 2717, 1961, 2644, 1962, 2954, 1963, 2999, 1964, 3046, 1965, 3025, 1966, 3014, 1967, 3030, 1968, 3048, 1969, 3098, 1970, 3143, 1971, 3199, 1972, 3243, 1973, 3277, 1974, 3273, 1975, 3108, 1976, 3019, 1977, 3032, 1978, 3062, 1979, 3095, 1980, 3166, 1981, 3240, 1982, 3256, 1983, 3257, 1984, 3288, 1985, 3354, 1986, 3430, 1987, 3515, 1988, 3607, 1989, 3704, 1990, 3821, 1991, 4136, 1992, 4069, 1993, 4025, 1994, 3999, 1995, 3996, 1996, 3994, 1997, 3991, 1998, 4044, 1999, 4075, 2000, 4116, 2001, 4183, 2002, 4213, 2003, 4198, 2004, 4210, 2005, 4241, 2006, 4328, 2007, 4440, 2008, 4548, 2009, 4588, 2010, 4593, 2011, 4705, 2012, 4776, 2013, 4837, 2014, 4918 ] )
		.autoAxis()
		.setLineColor('purple')
		.setLineWidth( 2 );

	g.setTitle("Number of employed people in Switzerland (yearly average)");
	g.getXAxis().setLabel('Year').gridsOff();
	g.getYAxis().setLabel("Number of people (in thousands)").secondaryGridOff();
	g.draw();

	return g;
}


makeGraph( "example-1" );
</script>


## Graph.newShape

To create a new shape, there is only a single method to remember: ```graph.newShape```. <a href="Graph.html#newShape">Graph#newShape</a> belongs to the <a href="Graph.html">Graph</a> class and it is as of today the only way to create a new shape and assign it to the graph. The syntax of the ```newShape``` method is the following

```Graph.newShape( String shapeType, Object<String,String> shapeOptions, Boolean mute );```

Where :
* ```shapeType``` is the type of the shape (e.g. ```line```, ```rectangle```, ```arrow```, ... ). The types are defined by the constructor registering (see later)
* ```shapeOptions``` is a map (key/value) of options associated to the shape. Except for shape-specific options, the default available ones are:
	* ```Array<Position> position``` - An array of position elements (see explanations later in this tutorial)
	* ```String fillColor``` - The ```fill``` attribute of the shape
	* ```String strokeColor``` - The ```stroke``` attribute of the shape
	* ```Number strokeWidth``` - The ```stroke-width``` attribute of the shape
	* ```Number layer``` - The layer on which the shape should be places
	* ```Boolean locked``` - ```true``` to locks the shape (prevents selecting, moving, resizing).
	* ```Boolean movable``` - ```true``` to allow the shape to be moved (can be nullified by ```locked```)
	* ```Boolean resizable``` - ```true``` to allow the shape to be resized (can be nullified by ```locked```)
	* ```Boolean selectable``` - ```true``` to allow the shape to be selected (can be nullified by ```locked```)
	* ```Object<String,String> attributes``` - Additional attributes added to the main DOM of the shape
	* ```Boolean handles``` - Notifies that the shape should have handles (used for resizing)
	* ```Boolean selectOnMouseDown``` - ```true``` if the shape should be selected when the user clicks on it
	* ```Boolean highlightOnMouseOver``` - ```true``` if the shape should be highlighted when the mouse hovers the shape (see later in the tutorial for more explanation)
	* ```Array<Object>``` label - The labels of the shape
		* ```Position position``` - The position of the label
		* ```String color``` - The color of the label
		* ```String angle``` - The angle of the label
		* ```String basline``` - The dominant baseline of the shape (see <a href="Shape.html#setLabelBaseline">Shape#setLabelBaseline</a>)
		* ```String anchor``` - The anchor of the label (see <a href="Shape.html#setLabelAnchor">Shape#setLabelAnchor</a>)
* ```Boolean mute``` cancels event emission from the graph

Many of these options can be changed after shape creation. They have been documented in the <a href="Shape.html">shape reference API</a>.

### Shape types

The ```shapeType``` option defined which kind of shape will be drawn. A number of default shapes are shipped with the standard distribution of jsGraph, but it is not excluded to create your own shape. As of the writing of this tutorial, jsGraph supports :

* Lines (```shapeType = "line"```)
* Arrows (```shapeType = "arrow"```)
* Rectangles (```shapeType = "rect"``` or ```shapeType = "rectangle"```)
* Ellipses (```shapeType = "ellipse"```)
* Label (```shapeType = "label"```)
* Area under the curve (```shapeType = "areaundercurve"```)
* X range (```shapeType = "rangex"```)

From now on in this tutorial, we will use the default shape arrow to explain the features of the shapes.

### Creating a new arrow

Creating a new arrow is as simple as this:

```var arrow = graph.newShape("arrow");```

However, at this stage, the arrow is not drawn. Its instance is simply created. To add it on the graph, you must use ```arrow.draw();```


<div id="example-2" class="jsgraph-example"></div>
<script>
( function() {

var g = makeGraph("example-2");
var arrow = g.newShape("arrow");
arrow.draw();
g.draw();

})();

</script>

Annnnnd... nothing happened ! The reason is simple: your arrow has no set position. Ok, let's create two positions (one for the start or the arrow, the other for the end) and assign them to the arrow. We then use the ```redraw``` method to update the shape.


{%highlight javascript%}
var position1 = g.newPosition( "150px", "30px" );
var position2 = g.newPosition( "190px", "80px" );
arrow.setPosition( position1, 0 );
arrow.setPosition( position2, 1 );
arrow.redraw();
{%endhighlight%}



<div id="example-3" class="jsgraph-example"></div>
<script>
( function() {

var g = makeGraph("example-3");
var arrow = g.newShape("arrow");
arrow.draw();
g.draw();

var position1 = g.newPosition( "150px", "30px" );
var position2 = g.newPosition( "190px", "80px" );
arrow.setPosition( position1, 0 );
arrow.setPosition( position2, 1 );
arrow.redraw();
g.draw();

})();
</script>


### Assign positions relative to the axes

However most of the time you do not want to reference the shape position with respect to the graph screen coordinates. Imagine you want to zoom inside the graph: the shapes will not move. Although it might be ok for some applications, you might want to place some shapes with respect to the axes coordinates. In our example, we want to point the arrow towards the data at a particular year to, say, note an event that happened then. To do so, you need to attach the shape to the axes. One way to do that is to assign the serie
```arrow.setSerie( g.getSerie("employment_nb") );```
and the axes of the serie will be used as the axes for the shape. Alternatively, you can use the ```setXAxis``` and ```setYAxis``` methods.



{%highlight javascript%}
arrow.setSerie( g.getSerie( "employment_nb" ) );
var position1 = g.newPosition( 1990, 3821 );
var position2 = g.newPosition( "190px", "80px" );
arrow.setPosition( position1, 0 );
arrow.setPosition( position2, 1 );
arrow.redraw();
{%endhighlight%}


<div id="example-4" class="jsgraph-example"></div>
<script>
( function() {

var g = makeGraph("example-4");
var arrow = g.newShape("arrow");
arrow.draw();
g.draw();

arrow.setSerie( g.getSerie( "employment_nb" ) );
var position1 = g.newPosition( 1990, 3821 );
var position2 = g.newPosition( "190px", "80px" );
arrow.setPosition( position1, 0 );
arrow.setPosition( position2, 1 );
arrow.redraw();
g.draw();

})();
</script>

You see here in the example, we specified the y value corresponding to the year (the x value). You actually don't have to that:

```var position1 = g.newPosition( 1990 );``` will do, and the y value will be automatically selected from the serie you have specified with ```setSerie```. In addition, we want the arrow to stand back a bit from the data. We can use the 3rd and 4th parameter of the ```GraphPosition``` constructor, which specify delta values that are applied to the main value:

```var position1 = g.newPosition( 1990, false, -3, "-5px" );```

Here, ```-3``` refers to the position relative to the axis (no string and no "px" in the end) and therefore, -3 years will be subtracted from 1990, so the arrow will point at 1987. Honestly it makes little sense here, and perhaps "-5px" would be more logical, like I did with the y-coordinate.




{%highlight javascript%}
arrow.setSerie( g.getSerie( "employment_nb" ) );
var position1 = g.newPosition( 1990, undefined, -3, "-5px" );
var position2 = g.newPosition( "190px", "80px" );
arrow.setPosition( position1, 0 );
arrow.setPosition( position2, 1 );
arrow.redraw();
{%endhighlight%}

<div id="example-5" class="jsgraph-example"></div>
<script>
( function() {

	var g = makeGraph("example-5");
	var arrow = g.newShape("arrow");
	arrow.draw();
	g.draw();

	arrow.setSerie( g.getSerie( "employment_nb" ) );
	var position1 = g.newPosition( 1990, undefined, -3, "-5px" );
	var position2 = g.newPosition( "190px", "80px" );
	arrow.setPosition( position1, 0 );
	arrow.setPosition( position2, 1 );
	arrow.redraw();
	g.draw();

})();
</script>


We might also want to define the second position (defining the beginning of the arrow) *relative to* the tip of the arrow, as opposite to in absolute coordinates. To do that, we can link the two positions together like this :



{%highlight javascript%}
var position1 = g.newPosition( 1990, undefined, -3, "-5px" );
var position2 = g.newPosition( undefined, undefined, "-30px", "-30px" ); // -30px relative to position 1
position2.relativeTo( position1 );

arrow.setPosition( position1, 0 );
arrow.setPosition( position2, 1 );
{%endhighlight%}

Two things to note however:
* In this case, the graph and axes of *position2* will be used to compute the position of *position1*.
* The two first arguments of the position constructor are empty in this example. This is because they are used for absolute positioning. If you had used ```g.newPosition("30px", undefined, undefined, "-30px");```, then the x position would **not** be relative to *position1*.


<div id="example-6" class="jsgraph-example"></div>
<script>
( function() {

	var g = makeGraph("example-6");
	var arrow = g.newShape("arrow");
	arrow.draw();
	g.draw();
	arrow.setStrokeColor('red');
	arrow.setSerie( g.getSerie( "employment_nb" ) );
	var position1 = g.newPosition( 1990, undefined, -3, "-5px" );
	var position2 = g.newPosition( undefined, undefined, "-50px", "-50px" );
	position2.relativeTo( position1 );

	arrow.setPosition( position1, 0 );
	arrow.setPosition( position2, 1 );
	arrow.setProp("jdkf", "dhfohsuaohsd");
	arrow.redraw();
	g.draw();

})();
</script>


### Styling the shape

Although each shapes will have its own styling methods, I am just writing this section to show you how to change the arrow's style with the built-in methods and how to redraw it. All the styling methods can be found in the <a href="Shape.html">Shape</a> reference API.

Let us make the arrow thicker, dashed and red using the following:


{%highlight javascript%}
arrow.setStrokeColor('purple');
arrow.setStrokeWidth( 2 );
arrow.setStrokeDasharray( "2,2" );
arrow.applyStyle();
{%endhighlight%}

Now, unless the ```applyStyle``` method is called, no styling will be applied. This is very useful if you have to change the position of the shape without changing its style. There is a gain of speed associated with the behaviour, obsiously, although you would not notice any difference if there is only a few shapes on your graph. Remember that applying properties to the DOM is the slowest operation in jsGraph, so if you need to modify the shape position several tens of times per seconds, its style will not be uselessly re-applied.

<div id="example-7" class="jsgraph-example"></div>
<script>
( function() {

	var g = makeGraph("example-7");
	var arrow = g.newShape("arrow");
	arrow.draw();
	g.draw();

	arrow.setSerie( g.getSerie( "employment_nb" ) );
	var position1 = g.newPosition( 1990, undefined, -3, "-5px" );
	var position2 = g.newPosition( undefined, undefined, "-50px", "-50px" );
	position2.relativeTo( position1 );

	arrow.setPosition( position1, 0 );
	arrow.setPosition( position2, 1 );
	arrow.redraw();
	g.draw();


	arrow.setStrokeColor('purple');
	arrow.setStrokeWidth( 2 );
	arrow.setStrokeDasharray( "2,2" );
	arrow.applyStyle();

})();

</script>

Note here that the tip of the arrow has not changed to red in this example. This is due to a chromium bug (<a href="https://code.google.com/p/chromium/issues/detail?id=367737">https://code.google.com/p/chromium/issues/detail?id=367737</a>) and a mozilla bug (<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=832483">https://bugzilla.mozilla.org/show_bug.cgi?id=832483</a>).

### Applying labels

You can also apply labels that can be associated with the shape. It has the advantage of moving with the shape and be deleted when the shape is deleted. Creating the label is equivalent to setting its text (using {@see Shape#setLabelText}).

For example, a label to the arrow can be created using the following code:


{%highlight javascript%}
arrow.setLabelText( "Limitation of immigration" );
var pos = g.newPosition( undefined, undefined, "-5px", "0px" );
pos.relativeTo( position2 );
arrow.setLabelPosition( pos );
arrow.setLabelAnchor( "end" );
arrow.setLabelColor( "purple" );
arrow.makeLabels();
{%endhighlight%}

(NB: ```makeLabels``` is used when a new label is created. Use ```updateLabels``` when no new label is created, but when the label position or styling has been changed)


<div id="example-8" class="jsgraph-example"></div>
<script>

function makeGraph2( dom ) {

	var g = makeGraph( dom );
	var arrow = g.newShape("arrow");
	arrow.draw();
	g.draw();

	arrow.setSerie( g.getSerie( "employment_nb" ) );
	var position1 = g.newPosition( 1990, undefined, -3, "-5px" );
	var position2 = g.newPosition( undefined, undefined, "-50px", "-50px" );
	position2.relativeTo( position1 );

	arrow.setPosition( position1, 0 );
	arrow.setPosition( position2, 1 );
	arrow.redraw();
	g.draw();


	arrow.setStrokeColor('purple');
	arrow.setStrokeWidth( 2 );
	arrow.setStrokeDasharray( "2,2" );
	arrow.applyStyle();

	arrow.setLabelText( "Limitation of immigration" );
	var pos = g.newPosition( undefined, undefined, "-5px", "0px" );
	arrow.setLabelAnchor( "end" );
	pos.relativeTo( position2 );
	arrow.setLabelPosition( pos );
	arrow.setLabelColor( "purple" );
	arrow.makeLabels();

	return {graph: g, arrow: arrow};
}


( function() {

	makeGraph2("example-8");
	
})();

</script>

To update the labels after they have been created the first time, use the ```updateLabels``` method:


{%highlight javascript%}
// ... label creation
arrow.setLabelColor( "purple" );
arrow.makeLabels(); // Label is created and becomes purple
arrow.setLabelColor( "olive" );
arrow.updateLabels(); // Label is updated and becomes olive
{%endhighlight%}



<div id="example-9" class="jsgraph-example"></div>
<script>
( function() {

	var made = makeGraph2( "example-9" );
	made.arrow.setLabelColor( "olive" );
	made.arrow.updateLabels(); // Label is updated and becomes olive

})();

</script>


## Selecting, moving, resizing the shape

jsGraph allows the user to interact dynamically with the shape, through various options. For instance, to allow the shape to be selected, use the <a href="Shape.html#selectable">Shape#selectable</a> method. When selected, the shape will take the style defined in the <a href="Shape.html#getSelectStyle">Shape#getSelectStyle</a> method:


{%highlight javascript%}
arrow.selectable();
made.arrow.setEventReceptacle();
arrow.setSelectStyle( {
	stroke: 'red'
} );
{%endhighlight%}


Note here the use of the LineShape#setEventReceptacle method. This is used to create a thicker, invisible line without dashing on top of the drawn arrow. This line is used as an event receptacle to facilitate the clicking on the arrow (otherwise, if you click slightly outside the line or in between the dashing, the line will not be selected. This is how SVG works.) This is not activated by default because jsGraph will become significantly slower if thousands of operations per second are performed by your script.


<div id="example-10" class="jsgraph-example"></div>
<script>
( function() {

	var made = makeGraph2( "example-10" );
	made.arrow.selectable()
	made.arrow.setEventReceptacle();
	made.arrow.setSelectStyle( {
			stroke: 'red'
	} );
})();

</script>

The general behavior of jsGraph is that only one shape can be selected at the time. Therefore, if you have multiple arrows, clicking on a non-selected arrow will unselect the currently select shape:


{%highlight javascript%}
var rectangle = made.graph.newShape("rectangle", {

  fillColor: 'green',
  fillOpacity: 0.5,
  position: [
    { x: 1950, y: "min" },
    { x: 1970, y: "max" }
  ],
  selectable: true,
  layer: 1
});

rectangle.setSelectStyle( {
  stroke: 'red',
  'stroke-width': 2
} );

made.arrow.setLayer( 3 );
made.arrow.draw( true );
rectangle.draw();
{%endhighlight%}

<div id="example-11" class="jsgraph-example"></div>
<script>
( function() {

	var made = makeGraph2( "example-11" );
	made.arrow.selectable();
	made.arrow.setEventReceptacle();
	made.arrow.setSelectStyle( {
			stroke: 'red'
	} );

	var rectangle = made.graph.newShape("rectangle", {

		fillColor: 'green',
		fillOpacity: 0.5,
		position: [
			{ x: 1950, y: "min" },
			{ x: 1970, y: "max" }
		],
		selectable: true,
		layer: 1
	});

	rectangle.setSelectStyle( {
		stroke: 'red',
		'stroke-width': 2
	} );

	made.arrow.setLayer( 3 );
	made.arrow.draw( true );
	rectangle.draw();

})();

</script>

### Display handles and allow resizing

To allow the user to manually resize a shape, you need to display the handles, either in the constructor options or via the method Shape#setHandles, such as:


{%highlight javascript%}
made.arrow.hasHandles( true );
made.arrow.createHandles();
{%endhighlight%}

Note that the shape must be selectable (```shape.selectable()```) to be resizable. In addition, the ```createHandles``` method needs to be called only if the handles haven't been set to ```true``` in the constructor (```graph.newShape("arrow", { handles: true } ) );```) in which case the handles will be created with the shape.

Adding handles without allowing the resizing of the shape wouldn't make too much sense. Therefore, you may use the {@see Shape#resizable} method to enable the resizing of the shape.


{%highlight javascript%}
arrow.resizable();
console.log( arrow.isResizable() ); // Returns true
// arrow.unresizable(); // cancles the resizable method
{%endhighlight%}


<div id="example-12" class="jsgraph-example"></div>
<script>
( function() {

	var made = makeGraph2( "example-12" );
	made.arrow.selectable();
	made.arrow.setEventReceptacle();
	made.arrow.setSelectStyle( {
			stroke: 'red'
	} );

	made.arrow.hasHandles( true );
	made.arrow.createHandles();

	made.arrow.resizable();
})();

</script>

### Allow moving

To allow the user to manually move a shape, you can use the {@see Shape#movable} method or use it in the constructor. Note that the shape must be selectable to be movable.


{%highlight javascript%}
var arrow = graph.newShape( "arrow", { selectable: true, movable: true } );
// or arrow.movable();
{%endhighlight%}


<div id="example-13" class="jsgraph-example"></div>
<script>
( function() {

	var made = makeGraph2( "example-13" );
	made.arrow.selectable();
	made.arrow.setEventReceptacle();
	made.arrow.setSelectStyle( {
		stroke: 'red'
	} );
	made.arrow.setLabelText( "Fixed to serie" );
	made.arrow.movable();

	var arrow2 = made.graph.newShape("arrow", { selectable: true, movable: true } );
	arrow2.setSerie( made.graph.getSerie( "employment_nb" ) );
	arrow2.setPosition( made.graph.newPosition( 1940, 3000 ), 0 );
	arrow2.setPosition( made.graph.newPosition( undefined, undefined, "-50px", "-50px" ).relativeTo( arrow2.getPosition( 0 ) ), 1 );
	arrow2.setLabelText("Not fixed to serie")
	arrow2.setLabelColor("olive");
	arrow2.setLabelPosition( made.graph.newPosition( undefined, undefined, "-3px", "0px" ).relativeTo( arrow2.getPosition( 1 ) ) );
	arrow2.draw();
	arrow2.setEventReceptacle();

})();

</script>


### Locking the shapes

Shapes can be prevent from being selected, resized and moved using the ```lock``` method:


{%highlight javascript%}
var arrow = graph.newShape( "arrow", { selectable: true, movable: true, handles: true, resizable: true, /* locked: true */ } );
arrow.lock(); // Locks the shape, and effectively nullifies selectable, movable, handles and resizable, until unlock() is called
{%endhighlight%}


<div id="example-14" class="jsgraph-example"></div>
<button id="example-14-unlock">Unlock</button>
<button id="example-14-lock">Lock</button>

<script>
( function() {

	var made = makeGraph2( "example-14" );
	made.arrow.selectable();
	made.arrow.movable();
	made.arrow.resizable();
	made.arrow.hasHandles( true );
	made.arrow.setEventReceptacle();
	made.arrow.setSelectStyle( {
			stroke: 'red'
	} );
	made.arrow.createHandles();
	
	document.getElementById( "example-14-unlock").addEventListener('click', function() {
		made.arrow.unlock();
	});

	document.getElementById( "example-14-lock").addEventListener('click', function() {
		made.arrow.lock();
	});
})();

</script>


## Setting and getting properties from the shape

Shapes are done in a way that all their properties can be exported and re-imported. This is useful to store information about the shape that you would have to reload later. This does not avoid the need to create the shape, though. However, it allows to set shape placement, labels and style in an effortless fashion.



{%highlight javascript%}
var shape = graph.newShape( "line" );

var position1 = graph.newPosition( "150px", "30px" );
var position2 = graph.newPosition( "190px", "80px" );
shape.setPosition( position1, 0 );
shape.setPosition( position2, 1 );
shape.setStrokeColor('red');
shape.draw();

console.log( shape.getProperties() );
{%endhighlight%}


<div id="example-15" class="jsgraph-example"></div>
<div>
	<button id="example-15-get">Get properties</button>
	<code></code>
</div><div>
	<button id="example-15-set">Change properties</button>
</div>
<script>

( function() {

	var made = makeGraph2( "example-15" );
	var shape = made.graph.newShape( "line" );

	var position1 = made.graph.newPosition( "50px", "30px" );
	var position2 = made.graph.newPosition( "90px", "80px" );
	shape.setPosition( position1, 0 );
	shape.setPosition( position2, 1 );
	shape.setStrokeColor('red');

	shape.draw();


	
	document.getElementById( "example-15-get").addEventListener('click', function() {
		$( this ).parent().find('code').html( JSON.stringify( shape.getProperties(), false, "\t" ) );
	});

	document.getElementById( "example-15-set").addEventListener('click', function() {
		var properties = { "strokeColor": [ "blue" ], "strokeWidth": [ 2 ], "position": [ { "x": "90px", "y": "30px" }, { "x": "120px", "y": "80px" } ] };

		shape.setProperties( properties );
		shape.draw();
	});
})();

</script>

### Listening to property change

Any change of property should trigger the event ```propertyChanged``` which you can listen on the shape:


{%highlight javascript%}
	made.arrow.on("propertyChanged", function( property ) {

		$("#example-16-property").html("<div>Changed property: <code>" + property + "</code>. New value: <code>" + JSON.stringify( made.arrow.getProp( property ) ) + "</code></div>");
	})
{%endhighlight%}


<div id="example-16" class="jsgraph-example"></div>
<span id="example-16-property"></span>

<script>
( function() {

	var made = makeGraph2( "example-16" );
	made.arrow.selectable();
	made.arrow.movable();
	made.arrow.resizable();
	made.arrow.hasHandles( true );
	made.arrow.setEventReceptacle();
	made.arrow.setSelectStyle( {
		stroke: 'red'
	} );
	
	made.arrow.createHandles();
	
	made.arrow.on("propertyChanged", function( property ) {

		$("#example-16-property").html("<div>Changed property: <code>" + property + "</code>. New value: <code>" + JSON.stringify( made.arrow.getProp( property ) ) + "</code></div>");
	})
})();

</script>

## Conclusion

It's time to put an end to this tutorial. I hope that creating shapes is now clear to you. Another tutorial is in preparation to showcase all the shapes that are shipped by default with jsGraph.