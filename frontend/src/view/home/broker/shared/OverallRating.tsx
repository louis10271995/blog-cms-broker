import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import BrokerRatingPercent from 'src/view/home/broker/shared/BrokerRatingPercent';
import RatingViewItem from 'src/view/shared/view/RatingViewItem';
import PropTypes from 'prop-types';

function OverallRating({
  record,
  hideDescription,
  hidePercent,
}) {
  return (
    <>
      <MDBox display="flex" alignItems="center" gap={1}>
        {!hidePercent && (
          <BrokerRatingPercent
            value={record.rating?.overall_rating}
          />
        )}
        <RatingViewItem
          value={record.rating?.overall_rating}
          precision={0.1}
          size="large"
        />
      </MDBox>
      {!hideDescription && (
        <MDTypography
          variant="body2"
          color="text"
          fontWeight="regular"
        >
          {i18n(
            'entities.broker.text.rating',
            record.rating?.overall_rating?.toFixed(2),
            5,
            record.rating?.overall_reviews,
          )}
        </MDTypography>
      )}
    </>
  );
}

OverallRating.defaultProps = {
  hideDescription: false,
  hidePercent: false,
};

OverallRating.propTypes = {
  record: PropTypes.any.isRequired,
  hideDescription: PropTypes.bool,
  hidePercent: PropTypes.bool,
};

export default OverallRating;
