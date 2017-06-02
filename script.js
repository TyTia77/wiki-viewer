var app = angular.module('WikiViewer', []);

app.controller('mainCtrl', ['$scope', '$http', function($scope, $http){

    $(document).on("click", ".search-input", function(){
        $('.search-input').addClass('expand-search');
        $('.fa').css({'transform': 'translateX(-40px)'});
        $('.search-icon').addClass('open');
    });

    $(document).on("click", ".fa", function(){
        $(this).css({'transform': 'translateX(-10000px)'});
        $('.search-input').val('');
        $('.search-input').removeClass('expand-search');
        $('.search-icon').removeClass('open');
    });

    $scope.search = function(){
        $scope.results = [];
        var container = document.querySelector('.container-fluid');
        var page = 'https://en.wikipedia.org/?curid=';
        var search = $('input').val();
        var cors = 'https://cors-anywhere.herokuapp.com/';
        var api = 'https://en.wikipedia.org/w/api.php?action=query&format=json';
            api += '&prop=extracts&generator=search&exsentences=1&exlimit=10&exintro=1';
            api += '&explaintext=1&gsrnamespace=0&gsrlimit=10&gsrsearch=';

            $http.get(cors +api +search).then(function(data){
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
