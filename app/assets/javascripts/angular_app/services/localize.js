'use strict';
angular.module('starterApp').factory('localize', [
  '$http', '$rootScope', '$window', '$cookieStore', function($http, $rootScope, $window, $cookieStore) {
    var localize;
    localize = {
      language: '',
      url: void 0,
      resourceFileLoaded: false,
      successCallback: function(data) {
        localize.dictionary = data;
        localize.resourceFileLoaded = true;
        return $rootScope.$broadcast('localizeResourcesUpdated');
      },
      setLanguage: function(value, lang) {
        localize.language = value.toLowerCase().split("-")[0];
        if($cookieStore.get('localizeLang')){
           $cookieStore.remove('localizeLang');
        }
        $cookieStore.put('localizeLang', lang);
        return localize.initLocalizedResources();
      },
      setUrl: function(value) {
        localize.url = value;
        return localize.initLocalizedResources();
      },
      buildUrl: function() {
        if (!localize.language) {
          localize.language = ($window.navigator.userLanguage || $window.navigator.language).toLowerCase();
          localize.language = localize.language.split("-")[0];
        }
        return 'i18n/resources-locale_' + localize.language + '.js';
      },
      initLocalizedResources: function() {
        var url;
        url = localize.url || localize.buildUrl();
        return $http({
          method: "GET",
          url: url,
          cache: false
        }).success(localize.successCallback).error(function() {
          return $rootScope.$broadcast('localizeResourcesUpdated');
        });
      },
      getLocalizedString: function(value) {
        var result, valueLowerCase;
        result = void 0;
        if (localize.dictionary && value) {
          valueLowerCase = value.toLowerCase();
          if (localize.dictionary[valueLowerCase] === '') {
            result = value;
          } else {
            result = localize.dictionary[valueLowerCase];
          }
        } else {
          result = value;
        }
        return result;
      }
    };
    return localize;
  }
]).directive('i18n', [
  'localize', function(localize) {
    var i18nDirective;
    i18nDirective = {
      restrict: "EA",
      updateText: function(ele, input, placeholder) {
        var result;
        result = void 0;
        if (input === 'i18n-placeholder') {
          result = localize.getLocalizedString(placeholder);
          return ele.attr('placeholder', result);
        } else if (input.length >= 1) {
          result = localize.getLocalizedString(input);
          return ele.text(result);
        }
      },
      link: function(scope, ele, attrs) {
        scope.$on('localizeResourcesUpdated', function() {
          return i18nDirective.updateText(ele, attrs.i18n, attrs.placeholder);
        });
        return attrs.$observe('i18n', function(value) {
          return i18nDirective.updateText(ele, value, attrs.placeholder);
        });
      }
    };
    return i18nDirective;
  }
]).controller('LangCtrl', [
  '$scope', 'localize', '$cookieStore', function($scope, localize, $cookieStore) {
    if($cookieStore.get('localizeLang')){
        $scope.lang = $cookieStore.get('localizeLang');
        var langString;
        switch ($scope.lang) {
            case 'English':
                langString = 'EN-US';
                break;
            case 'Français':
                langString = 'FR-FR';
                break;
        }
        localize.setLanguage(langString, $scope.lang);
    }else{
        $scope.lang = 'English';
    }

    $scope.setLang = function(lang) {
      switch (lang) {
        case 'English':
          localize.setLanguage('EN-US', lang);
          break;
        case 'Español':
          localize.setLanguage('ES-ES', lang);
          break;
        case '日本語':
          localize.setLanguage('JA-JP', lang);
          break;
        case '中文':
          localize.setLanguage('ZH-TW', lang);
          break;
        case 'Deutsch':
          localize.setLanguage('DE-DE', lang);
          break;
        case 'Français':
          localize.setLanguage('FR-FR', lang);
          break;
        case 'Italiano':
          localize.setLanguage('IT-IT', lang);
          break;
        case 'Portugal':
          localize.setLanguage('PT-BR', lang);
          break;
        case 'Русский язык':
          localize.setLanguage('RU-RU', lang);
          break;
        case '한국어':
          localize.setLanguage('KO-KR', lang);
      }
      return $scope.lang = lang;
    };
    return $scope.getFlag = function() {
      var lang;
      lang = $scope.lang;
      switch (lang) {
        case 'English':
          return 'flags-american';
        case 'Español':
          return 'flags-spain';
        case '日本語':
          return 'flags-japan';
        case '中文':
          return 'flags-china';
        case 'Deutsch':
          return 'flags-germany';
        case 'Français':
          return 'flags-france';
        case 'Italiano':
          return 'flags-italy';
        case 'Portugal':
          return 'flags-portugal';
        case 'Русский язык':
          return 'flags-russia';
        case '한국어':
          return 'flags-korea';
      }
    };
  }
]);
