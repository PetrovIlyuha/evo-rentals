import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import { makeStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxHeight: '150px',
    backgroundColor: '#4D35B0',
    color: theme.palette.common.lightYellow,
    padding: '14px 5px',
    borderRadius: 10,
  },
}));

const FilterByCategory = ({
  uniqueCategories,
  listedCategories,
  toggleShowCategory,
}) => {
  const classes = useStyles();
  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon style={{ fontSize: '2rem' }} />}
      defaultExpandIcon={<ChevronRightIcon style={{ fontSize: '2rem' }} />}
      multiSelect>
      <TreeItem nodeId='1' label='Categories'>
        {uniqueCategories.map((cat, idx) => (
          <TreeItem
            nodeId={String(idx + 2)}
            label={cat}
            key={idx}
            style={{
              width: '80%',
              backgroundColor: listedCategories.includes(cat)
                ? '#2D0876'
                : '#F2BF6C',
              color: listedCategories.includes(cat) ? '#F2BF6C' : '#2D0876',
              borderRadius: 4,
              marginTop: 5,
              marginBottom: 5,
            }}
            onClick={() => toggleShowCategory(cat)}
          />
        ))}
      </TreeItem>
    </TreeView>
  );
};

export default FilterByCategory;
