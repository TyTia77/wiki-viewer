var app = angular.module('WikiViewer', []);

app.controller('mainCtrl', ['$scope', '$http', function($scope, $http){

    $('.search-icon').on("click", function(){

        document.querySelector('.search-input').classList.remove('animate-search-out');
        document.querySelector('.search-handle').classList.remove('animate-lower-out');
        document.querySelector('.cross-left').classList.remove('animate-cross-left-out');
        document.querySelector('.cross-right').classList.remove('animate-cross-right-out');

        setTimeout(function(){
            document.querySelector('.search-input').classList.add('animate-search-in');
            document.querySelector('.search-input').removeAttribute('disabled');
            document.querySelector('.search-input').focus();
            document.querySelector('.search-handle').classList.add('animate-lower-in');
            document.querySelector('.cross-left').classList.add('animate-cross-left-in');
            document.querySelector('.cross-right').classList.add('animate-cross-right-in');
        },1)

    });

    $('.cross').on('click', function(){
        document.querySelector('.search-input').classList.remove('animate-search-in');
        document.querySelector('.search-handle').classList.remove('animate-lower-in');
        document.querySelector('.cross-left').classList.remove('animate-cross-left-in');
        document.querySelector('.cross-right').classList.remove('animate-cross-right-in');

        setTimeout(function(){
            document.querySelector('.search-input').setAttribute('disabled', '');
            document.querySelector('.search-input').classList.add('animate-search-out');
            document.querySelector('.search-handle').classList.add('animate-lower-out');
            document.querySelector('.cross-left').classList.add('animate-cross-left-out');
            document.querySelector('.cross-right').classList.add('animate-cross-right-out');
        },1);

    });


    var handleAnimations = function(){

    }



    $scope.search = function(){

        $scope.results = [];
        var container = document.querySelector('.container-fluid');
        var page = 'https://en.wikipedia.org/?curid=';
        var search = $('input').val();
        // var api = 'https://en.wikipedia.org/w/api.php?format=json&action='
        //     +'query&generator=search&gsrnamespace=0&gsrlimit=10&prop='
        //     +'pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
        var api = 'https://en.wikipedia.org/w/api.php?format=json&action='
            +'query&format=json&gsrlimit=15&generator=search&origin=*&gsrsearch=';

            $http.get(api +search).then(function(data){
                console.log(data);
                if(data.data.query){
                    angular.forEach(data.data.query.pages, function(item){
                        $scope.results.push({
                            title: item.title,
                            url: page +item.pageid
                        });
                    });

                    $scope.searchActive = true;
                    container.classList.add('height');
                } else {
                    $scope.searchActive = false;
                    container.classList.remove('height');
                }

            });
    }
}]);
