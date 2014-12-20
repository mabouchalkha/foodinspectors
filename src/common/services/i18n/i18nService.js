angular.module('common.services.i18n.i18nService', [
    'pascalprecht.translate'
    ])
    .config(['$translateProvider', '$translatePartialLoaderProvider', function($translateProvider, $translatePartialLoaderProvider) {

        $translatePartialLoaderProvider.addPart('dashboard');
        $translatePartialLoaderProvider.addPart('nav');
        $translatePartialLoaderProvider.addPart('header');
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'src/common/services/i18n/{part}/{lang}.json'
        });

        // $translateProvider.translations('en', translationsEn);
        $translateProvider.preferredLanguage('en');
    }]);