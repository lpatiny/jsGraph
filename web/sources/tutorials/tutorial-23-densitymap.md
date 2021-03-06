---
layout: page-sidemenu
subtitle: 'Density maps'
---
## Density maps
Density maps are a great way to render a lot of overlapping data. When data points that have some kind of an ```(x,y)``` relationships and you have sampled a lot of data, it would make little sense to render it with a normal line serie because:

* It looks really bad
* It doesn't show any weighing of your dataset
* It can become really slow
* Sometimes, a line serie wouldn't even make sense (think population density, for example)

This is where density maps come in. Density maps are really a great way to render a huge amount of data in a nutshell. They take as an input as many (x,y) datapoints as you wish, and will resample the data into a 2D matrix ```(x,y) = nb``` where ```nb``` is the number of datapoints falling into the boundaries ```[ x-dx, x+dx [ U [ y-dy, y+dy [```. We will call one set of ```(x,y,nb)``` as a bin. Basically, jsGraph calculates the density map by looping through your data and incrementing one of the 2D counters, the one closest to the ```(x,y)``` vector.

### <a id="doc-seriedef"></a>Defining density map series

{% highlight javascript %}
var serieMapDensity = graph.newSerie( serieName, serieOptions, 'densitymap' ); // Case sensitive
{% endhighlight %}

Where, as usual, ```serieName``` should be unique for your instance of jsGraph and serieOptions are currently not implemented for the density map.

### <a id="doc-dataformat"></a>Data format

As of today, there is only one way to set the ```(x,y)``` data of the serie: an array of ```(x,y)``` arrays:

{% highlight javascript %}
serieMapDensity.setData( [ [ x1, y1 ], [ x2, y2 ], ..., [ xn, yn ] ] );
{% endhighlight %}

NB: Don't forget setting the axes of the serie using ```serie.setXAxis```, ```serie.setYAxis``` or ```serie.autoAxis```.

### <a id="doc-densitymap"></a>Calculate a density map

Calculate the density map takes only one instruction, but it requires you to select the minimum values, interval values and number of bins you want to use. This can allow you to calculate the map on a subset of your data. The instruction goes as follows

{% highlight javascript %}
var map = serieMapDensity.calculateDensityMap( fromX, deltaX, numX, fromY, deltaY, numY );
{% endhighlight %}

* ```fromX``` could be ```serieMapDensity.getDataMin()``` to select the minimum value to start computing with as the minimum value of your ```(x,y)``` data
* ```deltaX``` could be ```( serieMapDensity.getDataMax() - serieMapDensity.getDataMin() ) / ( numX - 1 )
* ```numX``` is simply the number of bins you want to be shown

#### <a id="doc-autobins"></a> The automatic way with ```autoBins```

In practice ```calculateDensityMap``` is rather used internally. Although nothing prevents you from using explicitely, as a starting point, jsGraph exposes an easier method, ```serieMapDensity.autoBins( numX, numY )``` which does exactly what I described above: it uses the minimum value and maximum value of your data in the x and y direction to set the boundaries of the density map.

#### <a id="doc-adapt-screen"></a> Adapt it to your screen

A perhaps more clever way to calculate a density map is to take into account the amount of space on your graph. It doesn't make sense to show 1'000 bins x 1'000 bins on a 300x300 drawing area. ```serieMapDensity.setPxPerBin``` takes care of that problem by replacing ```calculateDensityMap``` and ```autoBins```. When the serie is about to be redrawn, ```setPxPerBin``` will look at the drawing width and height, divide it by a certain number you can specifiy (the number of bins per pixels) and recalculate the density map on the fly. Here's how to call it:

{% highlight javascript %}
var map = serieMapDensity.setPxPerBin( 3, 5 ); // 3px per bin in x direction, 5px per bin in y direction
{% endhighlight %}

### <a id="doc-colormap"></a>Color maps

At this point, we have calculate a density map, but still there is nothing to display because we haven't told jsGraph how to color each one of the bins. We introduce now the color maps, which is basically just like defining a gradient. Color maps are not limited to only 2 stop colors, but can take as many as you want. You can even define yourself the number of colors you want.

<div class="warning">A word of warning though. The more colors you want, the more DOM elements will have to be created. I would avoid 16-bit coloring if I were you</div>

Ok, let's see now how to create a color map:

#### <a id="doc-colormap-hsla"></a> HSL(A) color maps

Currently, they are the only kind of maps supported by jsGraph but they are probably the easier to handle in my opinion. The format for each HSLA element is ```{ h: [ 0-360 ], s: [ 0-1 ], l: [0-1], a: [0-1] }```

Let's take the classical black-to-red-to-yellow example (the heat map):

{% highlight javascript %}
serieMapDensity.colorMapHSL( [
	{ h: 0, s: 1, l: 0 }, // Black
	{ h: 0, s: 1, l: 0.5 }, // Red
	{ h: 60, s: 1, l: 0.5 } // Yellow
], 300 ); // Use 300 colors
{% endhighlight %}


<div id="graph-example-1"></div>
<script language="javascript">

	var graph = new Graph("graph-example-1").resize(800, 100);
	graph.getXAxis().turnGridsOff().setDisplay( false );
	graph.getYAxis().turnGridsOff().setDisplay( false );
	var s = graph.newSerie("s1", {}, "densitymap");
	var data = []; for( var i = 1; i < 200; i ++ ) { for( var j = 0; j < i; j ++ ) {  data.push( [ i + j / i, 0 ] ) } }
	s.setData( data ).autoAxis();
	graph.getYAxis().forceMin(-2).forceMax(2);
	s.setPxPerBin( false, 20, true );
	s.setBinsFromTo( 'x', 0.5, 199.5, 199 );

	s.colorMapHSL( [
		{ h: 0, s: 1, l: 0 }, // Black
		{ h: 0, s: 1, l: 0.5 }, // Red
		{ h: 60, s: 1, l: 0.5 } // Yellow
	], 300 ); // Use 300 colors
	graph.draw();

</script>

Another classic example is the rainbow color map, from blue to red, corresponding to three quarter of the hue wheel:

{% highlight javascript %}
serieMapDensity.colorMapHSL( [
	{ h: 270, s: 1, l: 0.5 }, // Blue
	{ h: 0, s: 1, l: 0.5 } // Red
], 300 ); // Use 300 colors
{% endhighlight %}

<div id="graph-example-2"></div>
<script language="javascript">

	var graph = new Graph("graph-example-2").resize(800, 100);
	graph.getXAxis().turnGridsOff().setDisplay( false );
	graph.getYAxis().turnGridsOff().setDisplay( false );
	var s = graph.newSerie("s1", {}, "densitymap");
	var data = []; for( var i = 1; i < 200; i ++ ) { for( var j = 0; j < i; j ++ ) {  data.push( [ i + j / i, 0 ] ) } }
	s.setData( data ).autoAxis();
	graph.getYAxis().forceMin(-2).forceMax(2);
	s.setPxPerBin( false, 20, true );
	s.setBinsFromTo( 'x', 0.5, 199.5, 199 );

	s.colorMapHSL( [
		{ h: 270, s: 1, l: 0.5 }, // Black
		{ h: 0, s: 1, l: 0.5 }, // Red
	], 300 ); // Use 300 colors
	graph.draw();

</script>


#### <a id="doc-autocolors"></a> Automatic color map boundaries

jsGraph can use only a sub-set of the color map by changing the boundaries of the color map. There will be more to that later, but let's skip it for a second, and let's use the minimum and maximum bin number found by ```colorMapDensity```. For this, you need to call the method:

{% highlight javascript %}
serie.autoColorMapBinBoundaries();
{% endhighlight %}


### <a id="doc-alltogether"></a>Let's put all of this together

Let's display your first color map. From there on we will use this example to demonstrate more advanced features.


{% highlight javascript %}
var graph = new Graph("graph-example-3").resize(400, 250);
graph.getXAxis().turnGridsOff();
graph.getYAxis().turnGridsOff();
var s = graph.newSerie("s1", {}, "densitymap");
s.setData( data ).autoAxis();
s.setPxPerBin( 5, 5, false );
s.colorMapHSL( [
  { h: 270, s: 1, l: 0.5 }, // Blue
  { h: 0, s: 1, l: 0.5 }, // Red
], 300 ); // Use 300 colors
graph.draw();
{% endhighlight %}



<div id="graph-example-3"></div>
<script language="javascript">

	$.get( baseUrl + 'datasets/density.txt', {}, function( txt ) {
		var data = txt.split("\n").map( function(el ) { return el.split("\t" ).map( parseFloat ) } );
		var graph = new Graph("graph-example-3").resize(400, 250);
		graph.getXAxis().turnGridsOff();
		graph.getYAxis().turnGridsOff();
		var s = graph.newSerie("s1", {}, "densitymap");
		s.setData( data ).autoAxis();
		s.setPxPerBin( 5, 5, false );
		s.colorMapHSL( [
			{ h: 270, s: 1, l: 0.5 }, // Blue
			{ h: 0, s: 1, l: 0.5 }, // Red
		], 300 ); // Use 300 colors
		graph.draw();
	});

</script>

Neat, no ?


### <a id="doc-custom-boundaries"></a> Custom bin boundaries


To go a little further, let's imagine that in the previous data set, every bin with a value lower that half the full range should be purple. For this purpose, we can use the ```onRedrawColorMapBinBoundaries``` and ```setColorMapBinBoundaries``` methods. So what's the difference ?

* ```setColorMapBinBoundaries( minBin, maxBin )``` will directly set the bin values and works when the map is not recalculated on the fly. When is the map recalculated on the fly ? It's done when you are using the ```setPxPerBins``` method, or you called the ```setBinsFromTo```. In either case, the series enters a mode where any direct call to ```calculateDensityMap``` has no impact, because it's called internally upon redraw
* ```onRedrawColorMapBinBoundaries( callback )``` is used for the other case. You need to feed a callback that returns a 2-element vector, the first value being the new min bin value, the second the new max bin value. The callback will fire with 2 parameters, the binMin and binMax values calculated by the ```calculateDensityMap``` method. These values are the extremeties of the density map and settings your color map bins boundaries further than them would have no impact.

Let's take a look at the same example, but with an additional method in there:


{% highlight javascript %}
s.onRedrawColorMapBinBoundaries( function( min, max ) {
	return [ (min + max) / 2, max ];
});
{% endhighlight %}

<div id="graph-example-4"></div>
<script language="javascript">

	$.get( baseUrl + 'datasets/density.txt', {}, function( txt ) {
		var data = txt.split("\n").map( function(el ) { return el.split("\t" ).map( parseFloat ) } );
		var graph = new Graph("graph-example-4").resize(400, 250);
		graph.getXAxis().turnGridsOff();
		graph.getYAxis().turnGridsOff();
		var s = graph.newSerie("s1", {}, "densitymap");
		s.setData( data ).autoAxis();
		s.setPxPerBin( 5, 5, false );

		s.onRedrawColorMapBinBoundaries( function( min, max ) {
			return [ ( max + min ) / 2, max ];
		});

		s.colorMapHSL( [
			{ h: 270, s: 1, l: 0.5 }, // Black
			{ h: 0, s: 1, l: 0.5 }, // Red
		], 300 ); // Use 300 colors
		graph.draw();
	});
</script>