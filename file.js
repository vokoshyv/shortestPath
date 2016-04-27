var Vertex = function(id){
  this.value = id;
  this.edges = {};
}

var Graph = function(){
  this.vertices = {};
  this.totalVertices = 0;
  this.totalEdges = 0;
}

Graph.prototype.addVertex = function(id){
  if (this.vertices[id] === undefined){
    var newVertex = new Vertex(id);
    this.vertices[id] = newVertex;
    this.totalVertices++;
  }
}

Graph.prototype.getVertex = function(id){
  if (this.vertices[id] !== undefined){
    return this.vertices[id];
  } else {
    console.log("ID does not exist in graph");
  }
}

Graph.prototype.addEdge = function(id1, id2){
  if (this.vertices[id1] !== undefined && this.vertices[id2] !== undefined){
    if (this.vertices[id1].edges[id2] === undefined && this.vertices[id2].edges[id1] === undefined){
      this.vertices[id1].edges[id2] = id2;
      this.vertices[id2].edges[id1] = id1;
      this.totalEdges++;
    } else {
      console.log('Edge already exists between id1 and id2');
    }
  } else {
    console.log('Either vertex of id1 or id2 or both do not exist in graph');
  }
}

Graph.prototype.removeEdge = function(id1, id2){
  if (this.vertices[id1] !== undefined && this.vertices[id2] !== undefined){
    if (this.vertices[id1].edges[id2] !== undefined && this.vertices[id2].edges[id1] !== undefined){
      delete this.vertices[id1].edges[id2];
      delete this.vertices[id2].edges[id1];
      this.totalEdges--;
    } else {
      console.log('Edge does not exist between id1 and id2');
    }
  } else {
    console.log('Either vertex of id1 or id2 or both do not exist in graph');
  }
}

Graph.prototype.removeVertex = function(id){
  if (this.vertices[id] !== undefined){
    var toDelete = this.vertices[id];
    for (var edge in toDelete.edges){
      this.removeEdge(id, edge);
    }
    delete this.vertices[id];
    this.totalVertices--;
  } else {
    console.log('ID does not exist in graph');
  }
}

Graph.prototype.findNeighbors = function(id){
  var neighbors = [];
  if (this.vertices[id] !== undefined){
    for (var edge in this.vertices[id].edges){
      neighbors.push(this.vertices[edge]);
    }
    return neighbors;
  } else {
    console.log('ID does not exist in graph');
  }
}

Graph.prototype.forEachVertex = function(func){
  for (vertexKey in this.vertices){
    func(this.vertices[vertexKey]);
  }
}

Graph.prototype.forEachEdge = function(func){
  for (vertexKey in this.vertices){
    var vertex = this.vertices[vertexKey];
    for (var edge in vertex.edges){
      func(edge, vertex.value);
    }
  }
}

Graph.prototype.createEdgeIf = function(callback){
  var work = Object.keys(this.vertices);
      
  for (var i = 0; i < work.length; i++){
    for (var j = i+1; j < work.length; j++){
      if (callback(work[i], work[j])){
        this.addEdge(work[i], work[j]);
      }
    }
  }
}


// create new graph
var work = new Graph();

// words
var pool = ['plea', 'duck', 'plek', 'plck', 'puck', 'duck', 'glea', 'goea', 'goba', 'doba', 'duba', 'duca', 'pleb', 'paek', 'pack'];

var i = pool.length;

while (i--){
  var temp = pool[i];
  var randIndex = Math.floor(Math.random() * (i+1));
  pool[i] = pool[randIndex];
  pool[randIndex] = temp;
}

var insertWords = function(pool) {
  for (var i = 0; i < pool.length; i++) {
    work.addVertex(pool[i]);
  }
}

insertWords(pool);

var compareWords =  function(word1, word2) {
  var splitWord1 = word1.split("");
  var splitWord2 = word2.split("");
  
  var differentCount = 0;
  
  for (var i = 0; i < splitWord1.length ; i++) {
    if (splitWord1[i] !== splitWord2[i]) {
      differentCount++;   
    } 
    
    if (differentCount > 1) {
      return false;
    }
  }
  
  return true;
  
}

work.createEdgeIf(compareWords);

console.log(work);





