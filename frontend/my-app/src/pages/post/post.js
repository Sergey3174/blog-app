import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { PostContent, Comments, PostForm } from './components';
import { useMatch, useParams } from 'react-router-dom';
import { loadPostAsync, RESET_POST_DATA } from '../../actions';
import { selectPost } from '../../selectors';
import { Error, PrivateContent } from '../../components';
import { ROLE } from '../../constans';

const PostContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const post = useSelector(selectPost);
	const dispatch = useDispatch();
	const params = useParams();
	const isCreating = !!useMatch('/post');
	const isEditing = !!useMatch('/post/:id/edit');

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}
		dispatch(loadPostAsync(params.id)).then((postData) => {
			setError(postData.error);
			setIsLoading(false);
		});
	}, [dispatch, params.id, isCreating]);

	if (isLoading) {
		return null;
	}

	const SpecificPostPage =
		isEditing || isCreating ? (
			<PrivateContent access={[ROLE.ADMIN]} ServerError={error}>
				<div className={className}>
					<PostForm post={post} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<PostContent post={post} />
				<Comments comments={post.comments} postId={post.id} />
			</div>
		);

	return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0px 80px;
`;
