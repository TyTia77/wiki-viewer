var app = angular.module('WikiViewer', []);

app.controller('mainCtrl', ['$scope', '$http', function($scope, $http){

    $('.search-input').on("click", function(){
        $('.search-input').addClass('expand-search');
        $('form').addClass('open');
        $('.search-icon').addClass('open');
    });

    $('.cross').on('click', function(){
        $('.search-input').removeClass('expand-search');
        $('form').removeClass('open');
        $('.search-icon').removeClass('open');
    });

    $scope.search = function(){
        $scope.results = [];
        var container = document.querySelector('.container-fluid');
        var page = 'https://en.wikipedia.org/?curid=';
        var search = $('input').val();
        // var api = 'https://en.wikipedia.org/w/api.php?format=json&action='
        //     +'query&generator=search&gsrnamespace=0&gsrlimit=10&prop='
        //     +'pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
        // var api = 'https://en.wikipedia.org/w/api.php?format=json&action='
        //     +'query&format=json&gsrlimit=15&generator=search&origin=*&gsrsearch=';
        var api = 'https://en.wikipedia.org/w/api.php?action=query&format=json';
            api+= '&prop=extracts&continue=gsroffset%7C%7C&generator=search';
            api+= '&exsentences=1&exlimit=15&exintro=1&explaintext=1&gsrlimit=15';
            api+= '&gsroffset=15&origin=*&gsrsearch=';

            $http.get(api +search).then(function(data){
                console.log(data);
                if(data.data.query){
                    angular.forEach(data.data.query.pages, function(item){
                        $scope.results.push({
                            title: item.title,
                            url: page +item.pageid,
                            info: item.extract
                        });
                    });

                    $scope.searchActive = true;
                    container.classList.add('height');
                } else {
                    $scope.searchActive = false;
                    container.classList.remove('height');
                }

            });
    };
}]);
