angular.module('rapporteren.directives', [])

    .directive('showWhen', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function($scope, $element, $attr) {

                function checkExpose() {
                    //var mq = $attr.showWhen == true ? '(min-width:768px)' : $attr.showWhen;
                    if($attr.showWhen == true){//$window.matchMedia(mq).matches){
                        $element.removeClass('ng-hide');
                    } else {
                        $element.addClass('ng-hide');
                    }
                }

                function onResize() {
                    debouncedCheck();
                }

                var debouncedCheck = ionic.debounce(function() {
                    $scope.$apply(function(){
                        checkExpose();
                    });
                }, 300, false);

                checkExpose();

                ionic.on('resize', onResize, $window);

                $scope.$on('$destroy', function(){
                    ionic.off('resize', onResize, $window);
                });

            }
        };
    }]);

