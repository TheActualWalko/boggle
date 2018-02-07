var cubes = [
  "aaafrs",
  "aaeeee",
  "aafirs",
  "adennn",
  "aeeeem",
  "aeegmu",
  "aegmnn",
  "afirsy",
  "bjkqxz",
  "ccenst",
  "ceiilt",
  "ceilpt",
  "ceipst",
  "ddhnot",
  "dhhlor",
  "dhlnor",
  "dhlnor",
  "eiiitt",
  "emottt",
  "ensssu",
  "fiprsy",
  "gorrvw",
  "iprrry",
  "nootuw",
  "ooottu"
];

var words = [
  "about",
  "after",
  "again",
  "air",
  "all",
  "along",
  "also",
  "an",
  "and",
  "another",
  "any",
  "are",
  "around",
  "as",
  "at",
  "away",
  "back",
  "be",
  "because",
  "been",
  "before",
  "below",
  "between",
  "both",
  "but",
  "by",
  "came",
  "can",
  "come",
  "could",
  "day",
  "did",
  "different",
  "do",
  "does",
  "don't",
  "down",
  "each",
  "end",
  "even",
  "every",
  "few",
  "find",
  "first",
  "for",
  "found",
  "from",
  "get",
  "give",
  "go",
  "good",
  "great",
  "had",
  "has",
  "have",
  "he",
  "help",
  "her",
  "here",
  "him",
  "his",
  "home",
  "house",
  "how",
  "I",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "just",
  "know",
  "large",
  "last",
  "left",
  "like",
  "line",
  "little",
  "long",
  "look",
  "made",
  "make",
  "man",
  "many",
  "may",
  "me",
  "men",
  "might",
  "more",
  "most",
  "Mr.",
  "must",
  "my",
  "name",
  "never",
  "new",
  "next",
  "no",
  "not",
  "now",
  "number",
  "of",
  "off",
  "old",
  "on",
  "one",
  "only",
  "or",
  "other",
  "our",
  "out",
  "over",
  "own",
  "part",
  "people",
  "place",
  "put",
  "read",
  "right",
  "said",
  "same",
  "saw",
  "say",
  "see",
  "she",
  "should",
  "show",
  "small",
  "so",
  "some",
  "something",
  "sound",
  "still",
  "such",
  "take",
  "tell",
  "than",
  "that",
  "the",
  "them",
  "then",
  "there",
  "these",
  "they",
  "thing",
  "think",
  "this",
  "those",
  "thought",
  "three",
  "through",
  "time",
  "to",
  "together",
  "too",
  "two",
  "under",
  "up",
  "us",
  "use",
  "very",
  "want",
  "water",
  "way",
  "we",
  "well",
  "went",
  "were",
  "what",
  "when",
  "where",
  "which",
  "while",
  "who",
  "why",
  "will",
  "with",
  "word",
  "work",
  "world",
  "would",
  "write",
  "year",
  "you",
  "your",
  "was"
];

var board = {
  0 : {},
  1 : {},
  2 : {},
  3 : {},
  4 : {}
};

function roll(){

  board = {
    0 : {},
    1 : {},
    2 : {},
    3 : {},
    4 : {}
  };

  for( var i in cubes ){
    var cube = cubes[i];
    var side = Math.floor( Math.random()*6 );
    var x;
    var y;
    var set = false;
    while( !set ){
      x = Math.floor( Math.random()*5 );
      y = Math.floor( Math.random()*5 );
      if( board[x][y] == null ){
        board[x][y] = cube.charAt(side);
        set = true;
      }
    }
  }

}

function draw(){
  var tileClass = "";
  $("#game").empty();
  for( var y in board ){
    $("#game").append("<tr id='row-"+y+"'></tr>");
    for( var x in board[y] ){
      if(board[y][x] == 'q'){
        board[y][x] = 'Qu';
        tileClass = 'qu';
      }else{
        tileClass = '';
      }
      var cell = "<td class='"+tileClass+"'>"+board[y][x]+"</td>";
      $("#row-"+y).append(cell);
    }
  } 
}

var filtered_words = [];

function filter(){

  for( var i in words ){
    var char_array = words[i].split('');
    var word_viable = true;
    for( var c in char_array ){
      if( char_array[c] == "q" && c+1 <= char_array.length && char_array[c+1] == "u" ){
        char_array.unset[c+1, 0];
      }
      var found = false;
      for( var y in board ){
        for( var x in board ){
          if( board[y][x] == char_array[c] ){
            found = true;
          }
        }
      }
      if( found == false ){
        word_viable = false;
      }
    }
    if( word_viable ){
      filtered_words.push( words[i] );
    }
  }

}

var time = 120;
$("#timer").text( time );

var timer = null;

/*

// This function grabs the definition of a word in XML format.
function grab_xml_definition ($word, $ref, $key)
  { $uri = "http://www.dictionaryapi.com/api/v1/references/" . urlencode($ref) . "/xml/" . 
          urlencode($word) . "?key=" . urlencode($key);
    return file_get_contents($uri);
  };

$xdef = grab_xml_definition("test", "collegiate", "5e5a69da-a5cf-42a6-b320-0a541e4fdf50");

*/

roll(); draw();

function begin(){
  $("#overlay").toggleClass("hidden");
  $("#overlay-text").text("GAME IN PROGRESS. Click to resume.");
  if( timer == null ){
    timer = setInterval(
      function(){
        time -= 1;
        $("#timer").text( time );
        if( time <= 0 ){
          $("#checker").css("display", "block");
          $("td").css("background-color", "red");
          $("#timer-wrap").css("color", "red");
          $("#timer-wrap").html("Time up!!!!");
          clearInterval( timer );
        }
      },
      1000
    );
  }else{
    clearInterval( timer );
    timer = null;
  }
}