import styled from 'styled-components';
import { Icon } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions';

import { useNavigate } from 'react-router-dom';
import { checkAccess } from '../../../../utils/check-access';
import { ROLE } from '../../../../constans';
import { selectUserRole } from '../../../../selectors';
import PropTypes from 'prop-types';

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const userRole = useSelector(selectUserRole);

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить статью ?',
				onConfirm: () => {
					dispatch(removePostAsync(id)).then(() => {
						navigate('/');
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && (
					<Icon
						id="fa-calendar-o"
						margin="0 7px 0 0"
						inactive={true}
						size="18px"
					/>
				)}
				{publishedAt}
			</div>
			{isAdmin && (
				<div className="buttons">
					{editButton}
					{publishedAt && (
						<Icon
							id="fa-trash-o"
							size="21px"
							margin="0 0 0 7px"
							onClick={() => onPostRemove(id)}
						/>
					)}
				</div>
			)}
		</div>
	);
};
export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};

	& .buttons {
		display: flex;
	}

	& i {
		position: relative;
		top: -1px;
	}

	& .published-at {
		display: flex;
		font-size: 18px;
	}
`;

SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.node.isRequired,
};
