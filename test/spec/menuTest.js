describe( 'Módulo menu', function(){
    'use strict';

    var menuService;
    var $state;
    var $rootScope;

    beforeEach( function(){
        module('erudioApp.menu' );
        inject( function(_menuService_, _$state_, _$rootScope_){
            menuService = _menuService_;
            $state = _$state_;
            $rootScope = _$rootScope_;
        })
    });
    
    /*
    beforeEach( inject(function(_$mdSidenav_,_$location_,_menuService_){
        $mdSidenav = _$mdSidenav_;
        $location = _$location_; 
        menuService = _menuService_;
    }));*/
    /*
    beforeEach( inject(function(_menuService_){
        menuService = _menuService_;
    }));
    */

    it( 'Teste da existencia do serviço', function(){
        expect( menuService ).toBeObject();
    });

    describe( 'Existência Metódos MenuService', function(){
        it( 'Existência do método toggleSelectSection', function(){
            expect(menuService).toHaveMethod('toggleSelectSection');
        });
        it( 'Existência do método isSectionSelected', function(){
            expect(menuService).toHaveMethod('isSectionSelected');
        });
        it( 'Existência do método showFullWidth', function(){
            expect(menuService).toHaveMethod('showFullWidth');
        });
        it( 'Existência do método setFocus', function(){
            expect(menuService).toHaveMethod('setFocus');
        });
        it( 'Existência do método removeFocus', function(){
            expect(menuService).toHaveMethod('removeFocus');
        });
        it( 'Existência do método toggleMenu', function(){
            expect(menuService).toHaveMethod('toggleMenu');
        });
        it( 'Existência do método selectSection', function(){
            expect(menuService).toHaveMethod('selectSection');
        });
        it( 'Existência do método getItems', function(){
            expect(menuService).toHaveMethod('getItems');
        });
        it( 'Existência do método getSection', function(){
            expect(menuService).toHaveMethod('getSection');
        });
        it( 'Existência do método addSection', function(){
            expect(menuService).toHaveMethod('addSection');
        });
        it( 'Existência do método toggleMenu', function(){
            expect(menuService).toHaveMethod('toggleMenu');
        });
        it( 'Existência da propriedade sections', function(){
            expect(menuService).toHaveArray('sections');
        });
        it( 'Existência da propriedade isFocused', function(){
            expect(menuService).toHaveBoolean('isFocused');
        });
        it( 'Existência da propriedade isOpen', function(){
            expect(menuService).toHaveBoolean('isOpen');
        });
    });


    describe( 'Operações básicas', function(){
        beforeEach( function(){
            menuService.sections = [{
                name: 'parent',
                type: 'toggle',
                icon: 'account_balance',
                open: false,
                pages: [
                    {
                        name: 'parent.child1',
                        state: 'app.private.home',
                        type: 'link'
                    },
                    {
                        name: 'parent.child2',
                        type: 'toggle',
                        icon: 'face',
                        open: false,
                        pages: [
                            {
                                name: 'parent.child2.child1',
                                state: 'app.public.login',
                                type: 'link'
                            },
                            {
                                name: 'parent.child2.child2',
                                type: 'toggle',
                                icon: 'face',
                                open: false,
                                pages: [
                                {
                                    name: 'parent.child2.child2.child1',
                                    state: 'app.private.demo',
                                    type: 'link'
                                }]
                            }
                        ]
                    }
                ]
            }];
        });


        it( 'Estado inicial do menu', function(){
            expect(menuService.showFullWidth()).toBeBoolean();
            expect(menuService.showFullWidth()).toBe(true);
        });
        it( 'Estado inicial com focus', function(){
            menuService.setFocus();
            expect(menuService.showFullWidth()).toBeBoolean();
            expect(menuService.showFullWidth()).toBe(true);
        });
        it( 'Estado inicial com open', function(){
            menuService.toggleMenu();
            expect(menuService.showFullWidth()).toBeBoolean();
            expect(menuService.showFullWidth()).toBe(false);
            expect(menuService.isOpen).toBe(false);
        });
        it( 'Selecionar um section', function(){
            menuService.selectSection(menuService.sections[0]);
            expect(menuService.isSectionSelected(menuService.sections[0])).toBeBoolean();
            expect(menuService.isSectionSelected(menuService.sections[0])).toBe(true);

            expect(menuService.isSectionSelected(menuService.sections[0].pages[1])).toBe(false);
        })
    });
});

