import {
  AccordionDetails,
  AccordionSummary,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UndoIcon from '@mui/icons-material/Undo';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/navigation/list/navigationListActions';
import selectors from 'src/modules/navigation/list/navigationListSelectors';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import FilterWrapper, {
  FilterButtons,
} from 'src/view/shared/styles/FilterWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import FilterAccordion from 'src/view/shared/filter/FilterAccordion';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDButton from 'src/mui/components/MDButton';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import InputNumberRangeFormItem from 'src/view/shared/form/items/InputNumberRangeFormItem';
import NavigationAutocompleteFormItem from 'src/view/navigation/autocomplete/NavigationAutocompleteFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import { filterBooleanOptions } from 'src/modules/utils';
import { navigationTypeOptions } from 'src/modules/navigation/navigationUtils';
import formActions from 'src/modules/form/formActions';

const schema = yup.object().shape({
  idRange: yupFilterSchemas.integerRange(
    i18n('entities.navigation.fields.idRange'),
  ),
  parent: yupFilterSchemas.relationToOne(
    i18n('entities.navigation.fields.parent'),
  ),
  name: yupFilterSchemas.string(
    i18n('entities.navigation.fields.name'),
  ),
  title: yupFilterSchemas.string(
    i18n('entities.navigation.fields.title'),
  ),
  link: yupFilterSchemas.string(
    i18n('entities.navigation.fields.link'),
  ),
  type: yupFilterSchemas.string(
    i18n('entities.navigation.fields.type'),
  ),
  activated: yupFilterSchemas.boolean(
    i18n('entities.navigation.fields.activated'),
  ),
  show_user_logged_in: yupFilterSchemas.boolean(
    i18n('entities.navigation.fields.show_user_logged_in'),
  ),
  show_in_navigation: yupFilterSchemas.boolean(
    i18n('entities.navigation.fields.show_in_navigation'),
  ),
});

const emptyValues = {
  idRange: [],
  name: null,
  title: null,
  link: null,
  parent: null,
  type: null,
  activated: null,
  show_user_logged_in: null,
  show_in_navigation: null,
};

const previewRenders = {
  idRange: {
    label: i18n('entities.navigation.fields.idRange'),
    render: filterRenders.decimalRange(),
  },
  parent: {
    label: i18n('entities.navigation.fields.parent'),
    render: filterRenders.relationToOne(),
  },
  name: {
    label: i18n('entities.navigation.fields.name'),
    render: filterRenders.generic(),
  },
  title: {
    label: i18n('entities.navigation.fields.title'),
    render: filterRenders.generic(),
  },
  link: {
    label: i18n('entities.navigation.fields.link'),
    render: filterRenders.generic(),
  },
  type: {
    label: i18n('entities.navigation.fields.type'),
    render: filterRenders.enumerator(
      'entities.navigation.enumerators.type',
    ),
  },
  activated: {
    label: i18n('entities.navigation.fields.activated'),
    render: filterRenders.boolean(),
  },
  show_user_logged_in: {
    label: i18n(
      'entities.navigation.fields.show_user_logged_in',
    ),
    render: filterRenders.boolean(),
  },
  show_in_navigation: {
    label: i18n(
      'entities.navigation.fields.show_in_navigation',
    ),
    render: filterRenders.boolean(),
  },
};

function NavigationListFilter(props) {
  const { sidenavColor } = selectMuiSettings();
  const rawFilter = useSelector(selectors.selectRawFilter);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'onSubmit',
  });

  useEffect(() => {
    dispatch(
      actions.doFetch(
        schema.cast(initialValues),
        initialValues,
      ),
    );
    // eslint-disable-next-line
  }, [dispatch]);

  const onSubmit = (values) => {
    const rawValues = form.getValues();
    dispatch(actions.doFetch(values, rawValues, false));
    setExpanded(false);
    dispatch(formActions.doRefresh());
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset());
    setExpanded(false);
    dispatch(formActions.doRefresh());
  };

  const onRemove = (key) => {
    form.setValue(key, emptyValues[key]);
    return form.handleSubmit(onSubmit)();
  };

  return (
    <FilterWrapper>
      <FilterAccordion
        expanded={expanded}
        onChange={(event, isExpanded) =>
          setExpanded(isExpanded)
        }
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="secondary" />}
        >
          <FilterPreview
            values={rawFilter}
            renders={previewRenders}
            expanded={expanded}
            onRemove={onRemove}
          />
        </AccordionSummary>
        <AccordionDetails>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item lg={6} xs={12}>
                  <InputNumberRangeFormItem
                    name="idRange"
                    label={i18n(
                      'entities.navigation.fields.idRange',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <NavigationAutocompleteFormItem
                    name="parent"
                    label={i18n(
                      'entities.navigation.fields.parent',
                    )}
                    variant="standard"
                    fullWidth
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name="name"
                    label={i18n(
                      'entities.navigation.fields.name',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name="title"
                    label={i18n(
                      'entities.navigation.fields.title',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name="link"
                    label={i18n(
                      'entities.navigation.fields.link',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <SelectFormItem
                    name="type"
                    label={i18n(
                      'entities.navigation.fields.type',
                    )}
                    options={navigationTypeOptions}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} xs={12}>
                  <SelectFormItem
                    name="activated"
                    label={i18n(
                      'entities.navigation.fields.activated',
                    )}
                    options={filterBooleanOptions}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} xs={12}>
                  <SelectFormItem
                    name="show_user_logged_in"
                    label={i18n(
                      'entities.navigation.fields.show_user_logged_in',
                    )}
                    options={filterBooleanOptions}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} xs={12}>
                  <SelectFormItem
                    name="show_in_navigation"
                    label={i18n(
                      'entities.navigation.fields.show_in_navigation',
                    )}
                    options={filterBooleanOptions}
                    variant="standard"
                  />
                </Grid>
              </Grid>

              <FilterButtons>
                <MDButton
                  variant="gradient"
                  color={sidenavColor}
                  type="submit"
                  disabled={props.loading}
                  startIcon={<SearchIcon />}
                  size="small"
                >
                  {i18n('common.search')}
                </MDButton>

                <MDButton
                  variant="outlined"
                  color={sidenavColor}
                  type="button"
                  onClick={onReset}
                  disabled={props.loading}
                  startIcon={<UndoIcon />}
                  size="small"
                >
                  {i18n('common.reset')}
                </MDButton>
              </FilterButtons>
            </form>
          </FormProvider>
        </AccordionDetails>
      </FilterAccordion>
    </FilterWrapper>
  );
}

export default NavigationListFilter;
