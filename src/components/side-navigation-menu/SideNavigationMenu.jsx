import React from 'react';
import TreeView from 'devextreme-react/tree-view';
import { navigation } from '../../app-navigation';
import { useNavigation } from '../../contexts/navigation';
import { useScreenSize } from '../../utils/media-query';
import './SideNavigationMenu.scss';


import * as events from 'devextreme/events';
import { isNumeric } from '@utils/common-functions';

export default function SideNavigationMenu(props) {
  const {
    children,
    selectedItemChanged,
    openMenu,
    compactMode,
    onMenuReady
  } = props;

  const firstParentNode = useRef(null);
  const { isLarge } = useScreenSize();
  function normalizePath () {
    return navigation.map((item) => (
      { ...item, expanded: isLarge, path: item.path && !(/^\//.test(item.path)) ? `/${item.path}` : item.path }
    ))
  }

  const items = useMemo(
    normalizePath,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { navigationData: { currentPath } } = useNavigation();

  const treeViewRef = useRef(null);
  const wrapperRef = useRef();
  const getWrapperRef = useCallback((element) => {
    const prevElement = wrapperRef.current;
    if (prevElement) {
      events.off(prevElement, 'dxclick');
    }

    wrapperRef.current = element;
    events.on(element, 'dxclick', (e) => {
      openMenu(e);
    });
  }, [openMenu]);

  useEffect(() => {
    const treeView = treeViewRef.current && treeViewRef.current.instance;
    if (!treeView) {
      return;
    }

    if (currentPath !== undefined) {
      treeView.selectItem(currentPath);
      treeView.expandItem(currentPath);
    }

    if (compactMode) {
      treeView.collapseAll();
    }

    handleParentSelected();
  }, [currentPath, compactMode]);

  const handleParentSelected = useCallback(() => {
    const navCurrent = treeViewRef.current;
    const selectedNode = navCurrent.instance.getSelectedNodes()[0];

    if (
      !selectedNode ||
      !selectedNode.parent ||
      !isNumeric(selectedNode.parent.key)
    ) {
      firstParentNode.current?.classList.remove("child-selected");
      firstParentNode.current = null;
      return;
    }

    const parentKey = selectedNode.parent.key - 1;
    const nodeElements = navCurrent.instance._nodeElements();

    firstParentNode.current = nodeElements[parentKey].childNodes[0];
    firstParentNode.current.className += " child-selected";
  }, [treeViewRef]);

  return (
    <div
      className={'dx-swatch-additional side-navigation-menu'}
      ref={getWrapperRef}
    >
      {children}
      <div className={'menu-container'}>
        <TreeView
          ref={treeViewRef}
          items={items}
          keyExpr={'path'}
          selectionMode={'single'}
          focusStateEnabled={false}
          expandEvent={'click'}
          onItemClick={selectedItemChanged}
          onContentReady={onMenuReady}
          width={'100%'}
        />
      </div>
    </div>
  );
}
