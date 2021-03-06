---
layout: page-sidemenu
subtitle: 'Tracking line'
---
## Tracking line


jsGraph allows you to display a vertical line as a tracker and to display information about the series at the x point of the tracker. Obviously your x data must be monotoneously increasing for this feature to work. I will show you through a serie of examples how to work with the tracking features.

### <a id="blank"></a>Blank example
Let's start by a standard blank example


<script>
	function makeGraph( dom ) {

	  var graph = new Graph( dom );
		graph.resize( 700, 300 ); // Resizes the graph
	  graph.getYAxis().secondaryGridOff();
	  graph.getXAxis().secondaryGridOff();

	  graph.getYAxis().setPrimaryGridColor("#f0f0f0");
	  graph.getXAxis().setSecondaryGridColor("#f0f0f0");

	  var colorado = [["2014",17944.255],["2013",18881.823],["2012",19263.158],["2011",18744.067],["2010",18978.981],["2009",17351.28],["2008",18961.826],["2007",19532.855],["2006",19707.00899],["2005",19013.11703],["2004",19251.20903],["2003",19595.836],["2002",19446.04],["2001",19764.973]];
	  var california = [["2014",878.434],["2013",915.246],["2012",1183.112],["2011",1539.699],["2010",1542.78],["2009",1521.939],["2008",1723.062],["2007",1752.384],["2006",1710.887],["2005",1676.522],["2004",1731.218],["2003",1727.233],["2002",1821.618],["2001",1739.07]];

	  var serie = graph.newSerie('CA').setLineColor("#2B65EC").setLineWidth( 2 );
	  serie.setData( california );
	  serie.autoAxis();

	  var serie = graph.newSerie('CO').setLineColor("#E42217").setLineWidth( 2 )
	  serie.setData( colorado );
	  serie.autoAxis();

	  graph.draw();
	  return graph;
	}

</script>


<div id="example-1" class="jsgraph-example"></div>

<script>
	var g = makeGraph("example-1");
</script>



{% highlight javascript %}
var graph = new Graph( "example-1" );
graph.resize( 700, 300 ); // Resizes the graph
graph.getYAxis().secondaryGridOff();
graph.getXAxis().secondaryGridOff();

graph.getYAxis().setPrimaryGridColor("#f0f0f0");
graph.getXAxis().setSecondaryGridColor("#f0f0f0");

var colorado = [["2014",17944.255],["2013",18881.823],["2012",19263.158],["2011",18744.067],["2010",18978.981],["2009",17351.28],["2008",18961.826],["2007",19532.855],["2006",19707.00899],["2005",19013.11703],["2004",19251.20903],["2003",19595.836],["2002",19446.04],["2001",19764.973]];
var california = [["2014",878.434],["2013",915.246],["2012",1183.112],["2011",1539.699],["2010",1542.78],["2009",1521.939],["2008",1723.062],["2007",1752.384],["2006",1710.887],["2005",1676.522],["2004",1731.218],["2003",1727.233],["2002",1821.618],["2001",1739.07]];

var serie = graph.newSerie('CA').setLineColor("#2B65EC").setLineWidth( 2 );
serie.setData( california );
serie.autoAxis();

var serie = graph.newSerie('CO').setLineColor("#E42217").setLineWidth( 2 )
serie.setData( colorado );
serie.autoAxis();
{% endhighlight %}


There are two modes of tracking available: ```individual``` and ```common```:

### <a id="commonmode"></a> Common mode

In the common mode, no matter where the mouse is, jsGraph will try to find the closest x value for each serie and process them all together. If there is no computable data for any serie (outside of any serie range), nothing is displayed. Otherwise, a vertical line is shown, the closest point in each serie is highlighted and a single text box appears (common to all series). Here's how to do:



<div id="example-2" class="jsgraph-example"></div>

<script>
	var graph = makeGraph("example-2");

	graph.trackingLine( {
	      
	    mode: "common", // Defines the mode, individual or common
	    snapToSerie: graph.getSerie("CA"), // In the common mode, choses the serie onto which the tracking line will snap

	    textMethod: function( output ) { // Method that should return the content of the text box
	      var txt = "";
	      if( output[ "CA" ] ) {
	        txt += "California: " + Math.round( output[ "CA" ].yValue ) + " ktons<br />";
	      }
	      if( output[ "CO" ] ) {
	        txt += "Colorado: " + Math.round( output[ "CO" ].yValue ) + " ktons";
	      }

	      return txt;
	    },

	    trackingLineShapeOptions: { // Parameters of the tracking line
	      strokeColor: '#c0c0c0'
	    },

	    series: [ // A list of series that can be tracked
	      {
	        serie: graph.getSerie("CA")
	      },

	      {
	        serie: graph.getSerie("CO"),
	        withinPx: 10 // Allows to be within a 10px range
	      } 
	    ]
  	}
  );


</script>



{% highlight javascript %}

graph.trackingLine( {
    
  mode: "common", // Defines the mode, individual or common
  snapToSerie: graph.getSerie("CA"), // In the common mode, choses the serie onto which the tracking line will snap

  textMethod: function( output ) { // Method that should return the content of the text box
    var txt = "";
    if( output[ "CA" ] ) {
      txt += "California: " + Math.round( output[ "CA" ].yValue ) + " ktons<br />";
    }
    if( output[ "CO" ] ) {
      txt += "Colorado: " + Math.round( output[ "CO" ].yValue ) + " ktons";
    }

    return txt;
  },

  trackingLineShapeOptions: { // Parameters of the tracking line
    strokeColor: '#c0c0c0'
  },

  series: [ // A list of series that can be tracked
    {
      serie: graph.getSerie("CA")
    },

    {
      serie: graph.getSerie("CO"),
      withinPx: 10 // Allows to be within a 10px range
    } 
  ]
});

{% endhighlight %}



* The ```snapToSerie``` option defined which serie will reference the available x values for the tracking line. The other series will look for the best point around the snapped value to return their closest value.
* The ```textMethod``` option defined a method used to generate the text located inside the legend box.
* The ```trackingLineShapeOptions``` applies its members to the line shape element. See <a href="ShapeLine.html">ShapeLine</a> for more details
* The ```series``` option lists all the series accepting tracking. The ```withinPx``` option defined the position range in which it is acceptable for the serie to show a tracking point. The ```withinVal``` option is also available for the same feature but in axis unit.


#### <a id="withinval"></a> withinVal and withinPx

To demonstrate the ```within``` feature, let us use another example. In this example, the ```snapToSerie``` option is set to the red 


<div id="example-3" class="jsgraph-example"></div>
<script>
  var graph = new Graph( "example-3" );

  graph.resize( 700, 300 ); // Resizes the graph
  graph.getYAxis().secondaryGridOff();
  graph.getXAxis().secondaryGridOff();

  graph.getYAxis().setPrimaryGridColor("#f0f0f0");
  graph.getXAxis().setSecondaryGridColor("#f0f0f0");

  var s1 = [ 1, 1, 2, 2, 3, 1, 4, 2, 5, 1, 6, 2, 7, 1, 8, 2, 9, 1, 10, 2, 11, 1, 12, 2, 13, 1 ];
  var s2 = [ 1, 1, 2.2, 2, 3.4, 1, 4.6, 2, 5.8, 1, 7, 2, 8.2, 1, 9.4, 2, 10.6, 1, 11.8, 2, 13, 1 ].map( function( value, index ) { if( index % 2 == 1 ) return value - 0.5; return value; });
  var s3 = [ 1, 1, 2.2, 2, 3.4, 1, 4.6, 2, 5.8, 1, 7, 2, 8.2, 1, 9.4, 2, 10.6, 1, 11.8, 2, 13, 1 ].map( function( value, index ) { if( index % 2 == 1 ) return value - 1; return value; });
  var s4 = [ 1, 1, 2.2, 2, 3.4, 1, 4.6, 2, 5.8, 1, 7, 2, 8.2, 1, 9.4, 2, 10.6, 1, 11.8, 2, 13, 1 ].map( function( value, index ) { if( index % 2 == 1 ) return value - 1.5; return value; });

  var serie = graph.newSerie('s1').setLineColor("#2B65EC").setLineWidth( 2 );
  serie.setData( s1 );
  serie.autoAxis();

  var serie = graph.newSerie('s2').setLineColor("#E42217").setLineWidth( 2 )
  serie.setData( s2 );
  serie.autoAxis();


  var serie = graph.newSerie('s3').setLineColor("#369173").setLineWidth( 2 )
  serie.setData( s3 );
  serie.autoAxis();

  var serie = graph.newSerie('s4').setLineColor("#DB810B").setLineWidth( 2 )
  serie.setData( s4 );
  serie.autoAxis();

  graph.trackingLine( {
      
    mode: "common", // Defines the mode, individual or common
    snapToSerie: graph.getSerie("s1"), // In the common mode, choses the serie onto which the tracking line will snap

    textMethod: function( output, x, xpx ) { // Method that should return the content of the text box
      var text = "Series tracked (x = " + x + ")<br /><ul>";
      var j = 0;
      for( var i in output ) {
      	j++;
      	switch( i ) {

      		case "s2":
      			text += "<li>Serie 2: x = " + output[ i ].xValue + "</li>";
      		break;


      		case "s3":
      			text += "<li>Serie 3: x = " + output[ i ].xValue + "</li>";
      		break;


      		case "s4":
      			text += "<li>Serie 4: x = " + output[ i ].xValue + "</li>";
      		break;
      	}
      }

      if( j == 0 ) {
      	text += "<li>No serie tracked</li>";
      }
      text += "</ul>";
      console.log(output);
      return text;
    },

    trackingLineShapeOptions: { // Parameters of the tracking line
      strokeColor: '#c0c0c0'
    },

    series: [ // A list of series that can be tracked

      {
        serie: graph.getSerie("s2"),
        withinPx: 10 // Allows to be within a 10px range
      },

      {
        serie: graph.getSerie("s3"),
        withinPx: 30 // Allows to be within a 10px range
      },

      {
        serie: graph.getSerie("s4"),
        withinVal: 0.2 // Allows to be within a 10px range
      } 
    ]
  });


  graph.draw();
 </script>

 

{% highlight javascript %}
var graph = new Graph( "example-3" );

graph.resize( 700, 300 ); // Resizes the graph
graph.getYAxis().secondaryGridOff();
graph.getXAxis().secondaryGridOff();

graph.getYAxis().setPrimaryGridColor("#f0f0f0");
graph.getXAxis().setSecondaryGridColor("#f0f0f0");

var s1 = [ 1, 1, 2, 2, 3, 1, 4, 2, 5, 1, 6, 2, 7, 1, 8, 2, 9, 1, 10, 2, 11, 1, 12, 2, 13, 1 ];
var s2 = [ 1, 1, 2.2, 2, 3.4, 1, 4.6, 2, 5.8, 1, 7, 2, 8.2, 1, 9.4, 2, 10.6, 1, 11.8, 2, 13, 1 ].map( function( value, index ) { if( index % 2 == 1 ) return value - 0.5; return value; });
var s3 = [ 1, 1, 2.2, 2, 3.4, 1, 4.6, 2, 5.8, 1, 7, 2, 8.2, 1, 9.4, 2, 10.6, 1, 11.8, 2, 13, 1 ].map( function( value, index ) { if( index % 2 == 1 ) return value - 1; return value; });
var s4 = [ 1, 1, 2.2, 2, 3.4, 1, 4.6, 2, 5.8, 1, 7, 2, 8.2, 1, 9.4, 2, 10.6, 1, 11.8, 2, 13, 1 ].map( function( value, index ) { if( index % 2 == 1 ) return value - 1.5; return value; });

var serie = graph.newSerie('s1').setLineColor("#2B65EC").setLineWidth( 2 );
serie.setData( s1 );
serie.autoAxis();

var serie = graph.newSerie('s2').setLineColor("#E42217").setLineWidth( 2 )
serie.setData( s2 );
serie.autoAxis();


var serie = graph.newSerie('s3').setLineColor("#369173").setLineWidth( 2 )
serie.setData( s3 );
serie.autoAxis();

var serie = graph.newSerie('s4').setLineColor("#DB810B").setLineWidth( 2 )
serie.setData( s4 );
serie.autoAxis();

graph.trackingLine( {
    
  mode: "common", // Defines the mode, individual or common
  snapToSerie: graph.getSerie("s1"), // In the common mode, choses the serie onto which the tracking line will snap

  textMethod: function( output ) { // Method that should return the content of the text box
    var txt = "";
    return txt;
  },

  trackingLineShapeOptions: { // Parameters of the tracking line
    strokeColor: '#c0c0c0'
  },

  series: [ // A list of series that can be tracked

    {
      serie: graph.getSerie("s2"),
      withinPx: 10 // Allows to be within a 10px range
    },

    {
      serie: graph.getSerie("s3"),
      withinPx: 20 // Allows to be within a 10px range
    },

    {
      serie: graph.getSerie("s4"),
      withinVal: 0.2 // Allows to be within a 10px range
    } 
  ]
});

graph.draw();
{% endhighlight %}



In this example, the second serie (red) will only highlight if the snapped point on the blue serie is less than 10px than the closest point on the red serie. With this particular graph width, it happens when the x value of the red point is either exactly on the blue one or shifted by one. The third serie (green) will highlight a point only if it is within 20px of the snapped point on the blue serie. Therefore, more points compared to the red serie are selected. In the fourth serie (orange), only points not further than 0.2 (included) will be tracked. If no point is within 0.2 (in x axis value), then no tracking is done and the dot is not showed. The only tracked points are the first two (0, +0.2), the three in the middle (-0.2, 0, +0.2) and the last two (-0.2, 0).

You may also note that the serie 1 is used for snapping but is not in the tracked series list. It therefore doesn't show up in the list !